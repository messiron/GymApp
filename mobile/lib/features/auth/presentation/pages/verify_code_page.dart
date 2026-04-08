import 'package:flutter/material.dart';

import '../../../../shared/widgets/app_text_field.dart';
import '../../../../shared/widgets/primary_button.dart';
import '../../../../shared/widgets/responsive_auth_scaffold.dart';
import '../controllers/auth_controller.dart';
import '../widgets/auth_brand_panel.dart';
import '../widgets/auth_feedback_banner.dart';

class VerifyCodePage extends StatefulWidget {
  final String email;

  const VerifyCodePage({
    super.key,
    required this.email,
  });

  @override
  State<VerifyCodePage> createState() => _VerifyCodePageState();
}

class _VerifyCodePageState extends State<VerifyCodePage> {
  final _formKey = GlobalKey<FormState>();
  final _codeController = TextEditingController();
  final _controller = AuthController();

  @override
  void dispose() {
    _codeController.dispose();
    _controller.dispose();
    super.dispose();
  }

  String? _codeValidator(String? value) {
    final code = value?.trim() ?? '';
    if (code.isEmpty) return 'El código es obligatorio';
    if (code.length < 4) return 'Ingresa un código válido';
    return null;
  }

  Future<void> _submit() async {
  FocusScope.of(context).unfocus();

  if (!_formKey.currentState!.validate()) return;

  final success = await _controller.login(
    email: widget.email,
    code: _codeController.text.trim(),
  );

  if (!mounted) return;
  setState(() {});

  if (success) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home',
      (route) => false,
      arguments: _controller.user?.email ?? widget.email,
    );
  }
}

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (_, __) {
        return ResponsiveAuthScaffold(
          brandPanel: AuthBrandPanel(
            title: 'Verifica tu acceso',
            subtitle:
                'Ingresa el código que enviamos a ${widget.email} para continuar.',
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
                      'Código de acceso',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.email,
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
                      controller: _codeController,
                      label: 'Código',
                      hint: 'Ingresa el código',
                      keyboardType: TextInputType.number,
                      maxLength: 8,
                      validator: _codeValidator,
                    ),
                    const SizedBox(height: 12),
                    PrimaryButton(
                      text: 'Ingresar',
                      isLoading: _controller.isLoading,
                      onPressed: _submit,
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: TextButton(
                        onPressed: _controller.isLoading
                            ? null
                            : () => Navigator.pop(context),
                        child: const Text('Cambiar correo'),
                      ),
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