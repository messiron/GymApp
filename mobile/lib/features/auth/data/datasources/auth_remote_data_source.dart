import '../../../../core/constants/api_constants.dart';
import '../../../../core/network/api_client.dart';
import '../models/auth_user_model.dart';
import '../models/send_code_response_model.dart';

class AuthRemoteDataSource {
  final ApiClient apiClient;

  AuthRemoteDataSource(this.apiClient);

  Future<SendCodeResponseModel> sendCode(String email) async {
    final response = await apiClient.post(
      url: '${ApiConstants.baseUrl}${ApiConstants.sendCode}',
      body: {'email': email},
    );

    return SendCodeResponseModel.fromJson(response);
  }

  Future<AuthUserModel> login({
    required String email,
    required String code,
  }) async {
    final response = await apiClient.post(
      url: '${ApiConstants.baseUrl}${ApiConstants.login}',
      body: {
        'email': email,
        'code': code,
      },
    );

    return AuthUserModel.fromJson(response, email);
  }
}