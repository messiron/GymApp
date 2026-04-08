import 'package:flutter/material.dart';
import '../../../../app/theme/app_colors.dart';

class AuthBrandPanel extends StatelessWidget {
  final String title;
  final String subtitle;

  const AuthBrandPanel({
    super.key,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;

    final content = Container(
      width: double.infinity,
      padding: EdgeInsets.all(width >= 1000 ? 48 : 28),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.primary,
            AppColors.secondary,
          ],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 74,
            height: 74,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.18),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.fitness_center_rounded,
              size: 36,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 28),
          const Text(
            'GymApp',
            style: TextStyle(
              fontSize: 34,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 14),
          Text(
            title,
            style: const TextStyle(
              fontSize: 28,
              height: 1.15,
              fontWeight: FontWeight.w700,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 15,
              height: 1.45,
              color: Colors.white.withValues(alpha: 0.92),
            ),
          ),
        ],
      ),
    );

    if (width >= 1000) {
      return Container(
        color: AppColors.primaryDark,
        padding: const EdgeInsets.all(42),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: content,
          ),
        ),
      );
    }

    return content;
  }
}