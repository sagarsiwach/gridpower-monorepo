import 'package:flutter_test/flutter_test.dart';
import 'package:gridcharge_app/main.dart';

void main() {
  testWidgets('labels mock availability', (tester) async {
    await tester.pumpWidget(const ChargeApp());
    expect(find.text('DEMONSTRATION DATA'), findsOneWidget);
  });
}
