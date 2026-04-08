class Failure implements Exception {
  final String message;

  Failure(this.message);

  @override
  String toString() => message;
}

class NetworkFailure extends Failure {
  NetworkFailure(super.message);
}

class ServerFailure extends Failure {
  ServerFailure(super.message);
}

class ValidationFailure extends Failure {
  ValidationFailure(super.message);
}