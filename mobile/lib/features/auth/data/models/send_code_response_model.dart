class SendCodeResponseModel {
  final String message;

  const SendCodeResponseModel({required this.message});

  factory SendCodeResponseModel.fromJson(Map<String, dynamic> json) {
    return SendCodeResponseModel(
      message: json['message']?.toString() ?? 'Código enviado correctamente',
    );
  }
}