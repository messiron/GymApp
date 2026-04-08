import '../../domain/entities/auth_user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_data_source.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl(this.remoteDataSource);

  @override
  Future<String> sendCode(String email) async {
    final result = await remoteDataSource.sendCode(email);
    return result.message;
  }

  @override
  Future<AuthUser> login({
    required String email,
    required String code,
  }) {
    return remoteDataSource.login(email: email, code: code);
  }
}