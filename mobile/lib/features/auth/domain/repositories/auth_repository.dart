import '../entities/auth_user.dart';

abstract class AuthRepository {
  Future<String> sendCode(String email);
  Future<AuthUser> login({
    required String email,
    required String code,
  });
}