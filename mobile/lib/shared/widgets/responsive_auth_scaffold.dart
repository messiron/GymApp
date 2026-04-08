import 'package:flutter/material.dart';

import '../../app/theme/app_colors.dart';

class ResponsiveAuthScaffold extends StatelessWidget {
  final Widget brandPanel;
  final Widget formPanel;

  const ResponsiveAuthScaffold({
    super.key,
    required this.brandPanel,
    required this.formPanel,
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;

    if (width >= 1000) {
      return Scaffold(
        body: Row(
          children: [
            Expanded(flex: 11, child: brandPanel),
            Expanded(
              flex: 9,
              child: Container(
                color: AppColors.background,
                alignment: Alignment.center,
                padding: const EdgeInsets.all(32),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 460),
                  child: formPanel,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(
              horizontal: width < 600 ? 20 : 32,
              vertical: 24,
            ),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Column(
                children: [
                  brandPanel,
                  const SizedBox(height: 24),
                  formPanel,
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}