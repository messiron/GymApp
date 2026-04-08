import '../../domain/entities/auth_user.dart';

class AuthUserModel extends AuthUser {
  const AuthUserModel({
    required super.email,
    super.accessToken,
  });

  factory AuthUserModel.fromJson(Map<String, dynamic> json, String fallbackEmail) {
    return AuthUserModel(
      email: json['email']?.toString() ?? fallbackEmail,
      accessToken: json['accessToken']?.toString() ??
          json['token']?.toString() ??
          json['access_token']?.toString(),
    );
  }
}