import '../repositories/auth_repository.dart';

class SendCodeUseCase {
  final AuthRepository repository;

  SendCodeUseCase(this.repository);

  Future<String> call(String email) {
    return repository.sendCode(email);
  }
}