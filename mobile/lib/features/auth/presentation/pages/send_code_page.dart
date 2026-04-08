import 'package:flutter/material.dart';

import '../../../../app/routes/app_router.dart';
import '../../../../shared/widgets/app_text_field.dart';
import '../../../../shared/widgets/primary_button.dart';
import '../../../../shared/widgets/responsive_auth_scaffold.dart';
import '../controllers/auth_controller.dart';
import '../widgets/auth_brand_panel.dart';
import '../widgets/auth_feedback_banner.dart';

class SendCodePage extends StatefulWidget {
  const SendCodePage({super.key});

  @override
  State<SendCodePage> createState() => _SendCodePageState();
}

class _SendCodePageState extends State<SendCodePage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _controller = AuthController();

  @override
  void dispose() {
    _emailController.dispose();
    _controller.dispose();
    super.dispose();
  }

  String? _emailValidator(String? value) {
    final email = value?.trim() ?? '';
    if (email.isEmpty) return 'El correo es obligatorio';

    final regex = RegExp(r'^[^@]+@[^@]+\.[^@]+$');
    if (!regex.hasMatch(email)) return 'Ingresa un correo válido';

    return null;
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();

    if (!_formKey.currentState!.validate()) return;

    final email = _emailController.text.trim();
    final success = await _controller.sendCode(email);

    if (!mounted) return;
    setState(() {});

    if (success) {
      Navigator.pushNamed(
        context,
        AppRouter.verifyCode,
        arguments: email,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (_, __) {
        return ResponsiveAuthScaffold(
          brandPanel: const AuthBrandPanel(
            title: 'Entrena mejor, inicia fácil',
            subtitle:
                'Ingresa tu correo para recibir un código de acceso y continuar con tu experiencia en GymApp.',
          ),
          formPanel: Card(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Acceso',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Escribe tu correo electrónico para enviarte un código.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 24),
                    if (_controller.errorMessage != null) ...[
                      AuthFeedbackBanner(
                        message: _controller.errorMessage!,
                        isError: true,
                      ),
                      const SizedBox(height: 16),
                    ],
                    if (_controller.successMessage != null) ...[
                      AuthFeedbackBanner(
                        message: _controller.successMessage!,
                        isError: false,
                      ),
                      const SizedBox(height: 16),
                    ],
                    AppTextField(
                      controller: _emailController,
                      label: 'Correo electrónico',
                      hint: 'ejemplo@correo.com',
                      keyboardType: TextInputType.emailAddress,
                      validator: _emailValidator,
                    ),
                    const SizedBox(height: 12),
                    PrimaryButton(
                      text: 'Enviar código',
                      isLoading: _controller.isLoading,
                      onPressed: _submit,
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}