class AuthUser {
  final String email;
  final String? accessToken;

  const AuthUser({
    required this.email,
    this.accessToken,
  });
}