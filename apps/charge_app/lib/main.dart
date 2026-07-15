import 'package:flutter/material.dart';

void main() => runApp(const ChargeApp());

class ChargeApp extends StatelessWidget {
  const ChargeApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xfffa0016)),
      useMaterial3: true,
    ),
    home: const ChargeHome(),
  );
}

class ChargeHome extends StatelessWidget {
  const ChargeHome({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('GridCharge')),
    floatingActionButton: FloatingActionButton.extended(
      onPressed: () {},
      icon: const Icon(Icons.qr_code_scanner),
      label: const Text('SCAN TO CHARGE'),
    ),
    body: Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Chip(label: Text('DEMONSTRATION DATA')),
          const SizedBox(height: 18),
          const Text(
            'Chargers near you',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 18),
          ...[
            'Panaji Hub · 2 available',
            'Margao Central · 4 available',
            'Verna Works · Status unconfirmed',
          ].map(
            (name) => Card(
              child: ListTile(
                leading: const CircleAvatar(child: Icon(Icons.ev_station)),
                title: Text(name),
                subtitle: const Text(
                  'Mock availability · verify before travel',
                ),
                trailing: const Icon(Icons.chevron_right),
              ),
            ),
          ),
        ],
      ),
    ),
  );
}
