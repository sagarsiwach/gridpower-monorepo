import 'package:flutter_test/flutter_test.dart';
import 'package:gridenergy_app/main.dart';

void main() {
  testWidgets('labels demonstration data', (tester) async {
    await tester.pumpWidget(const EnergyApp());
    expect(find.textContaining('Demonstration data'), findsOneWidget);
  });
}
