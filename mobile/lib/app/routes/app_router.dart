import 'package:flutter/material.dart';
import 'package:mobile/features/auth/presentation/pages/home_page.dart';

import '../../features/auth/presentation/pages/send_code_page.dart';
import '../../features/auth/presentation/pages/verify_code_page.dart';

class AppRouter {
  static const String sendCode = '/';
  static const String verifyCode = '/verify-code';
  static const String home = '/home';

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case sendCode:
        return MaterialPageRoute(builder: (_) => const SendCodePage());

      case verifyCode:
        final email = settings.arguments as String? ?? '';
        return MaterialPageRoute(
          builder: (_) => VerifyCodePage(email: email),
        );

      case home:
        final email = settings.arguments as String? ?? '';
        return MaterialPageRoute(
          builder: (_) => HomePage(email: email),
        );

      default:
        return MaterialPageRoute(builder: (_) => const SendCodePage());
    }
  }
}