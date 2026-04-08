import 'dart:convert';
import 'package:http/http.dart' as http;

import '../errors/failures.dart';

class ApiClient {
  final http.Client _client;

  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  Future<Map<String, dynamic>> post({
    required String url,
    required Map<String, dynamic> body,
  }) async {
    try {
      final response = await _client.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );

      final dynamic decoded =
          response.body.isNotEmpty ? jsonDecode(response.body) : {};

      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (decoded is Map<String, dynamic>) return decoded;
        return <String, dynamic>{};
      }

      if (decoded is Map<String, dynamic>) {
        final message =
            decoded['message']?.toString() ??
            decoded['error']?.toString() ??
            'Ocurrió un error en el servidor';
        throw ServerFailure(message);
      }

      throw ServerFailure('Ocurrió un error en el servidor');
    } catch (e) {
      if (e is Failure) rethrow;
      throw NetworkFailure('No fue posible conectarse con el servidor');
    }
  }
}