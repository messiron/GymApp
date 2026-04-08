import 'package:flutter/foundation.dart';

class ApiConstants {
  static String get baseUrl {
    const envUrl = String.fromEnvironment('API_BASE_URL');
    if (envUrl.isNotEmpty) return envUrl;

    if (kIsWeb) {
      return 'http://localhost:3000';
    }

    defaultTargetPlatform;
    return 'http://10.0.2.2:3000';
  }

  static const String sendCode = '/api/auth/send-code';
  static const String login = '/api/auth/login';
}