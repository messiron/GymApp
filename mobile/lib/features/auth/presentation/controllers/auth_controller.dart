import 'package:flutter/material.dart';

import '../../../../core/errors/failures.dart';
import '../../data/datasources/auth_remote_data_source.dart';
import '../../data/repositories/auth_repository_impl.dart';
import '../../domain/entities/auth_user.dart';
import '../../domain/usecases/login_use_case.dart';
import '../../domain/usecases/send_code_use_case.dart';
import '../../../../core/network/api_client.dart';

class AuthController extends ChangeNotifier {
  AuthController()
      : _sendCodeUseCase = SendCodeUseCase(
          AuthRepositoryImpl(
            AuthRemoteDataSource(
              ApiClient(),
            ),
          ),
        ),
        _loginUseCase = LoginUseCase(
          AuthRepositoryImpl(
            AuthRemoteDataSource(
              ApiClient(),
            ),
          ),
        );

  final SendCodeUseCase _sendCodeUseCase;
  final LoginUseCase _loginUseCase;

  bool isLoading = false;
  String? errorMessage;
  String? successMessage;
  AuthUser? user;

  void _setLoading(bool value) {
    isLoading = value;
    notifyListeners();
  }

  void clearMessages() {
    errorMessage = null;
    successMessage = null;
    notifyListeners();
  }

  Future<bool> sendCode(String email) async {
    clearMessages();
    _setLoading(true);

    try {
      final message = await _sendCodeUseCase(email);
      successMessage = message;
      return true;
    } catch (e) {
      errorMessage = e is Failure ? e.message : 'No se pudo enviar el código';
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> login({
    required String email,
    required String code,
  }) async {
    clearMessages();
    _setLoading(true);

    try {
      user = await _loginUseCase(email: email, code: code);
      successMessage = 'Inicio de sesión exitoso';
      return true;
    } catch (e) {
      errorMessage = e is Failure ? e.message : 'No se pudo iniciar sesión';
      return false;
    } finally {
      _setLoading(false);
    }
  }
}