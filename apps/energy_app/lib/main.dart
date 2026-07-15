import 'package:flutter/material.dart';

void main() => runApp(const EnergyApp());

class EnergyApp extends StatelessWidget {
  const EnergyApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xfffa0016),
        brightness: Brightness.dark,
      ),
      scaffoldBackgroundColor: const Color(0xff10110f),
    ),
    home: const EnergyHome(),
  );
}

class EnergyHome extends StatelessWidget {
  const EnergyHome({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('GRIDENERGY · GridOS'),
      actions: const [
        Padding(
          padding: EdgeInsets.all(16),
          child: Chip(label: Text('MOCK')),
        ),
      ],
    ),
    body: Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'PORVORIM RESIDENCE',
            style: TextStyle(color: Colors.white54, letterSpacing: 2),
          ),
          const SizedBox(height: 8),
          const Text(
            'Your home is running\nmostly on sunlight.',
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 28),
          Row(
            children: const [
              Expanded(
                child: Metric(
                  label: 'SOLAR',
                  value: '8.2 kW',
                  icon: Icons.sunny,
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Metric(
                  label: 'BATTERY',
                  value: '78%',
                  icon: Icons.battery_charging_full,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Metric(
            label: 'SYSTEM HEALTH',
            value: 'Everything looks good',
            icon: Icons.verified_user,
          ),
          const Spacer(),
          const Text(
            'Demonstration data · no live device connection',
            style: TextStyle(color: Colors.amber, fontSize: 11),
          ),
        ],
      ),
    ),
  );
}

class Metric extends StatelessWidget {
  final String label, value;
  final IconData icon;
  const Metric({
    required this.label,
    required this.value,
    required this.icon,
    super.key,
  });
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      color: const Color(0xff20221e),
      border: Border.all(color: Colors.white12),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: const Color(0xffd9ff43)),
        const SizedBox(height: 22),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            letterSpacing: 1.5,
            color: Colors.white54,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          value,
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
        ),
      ],
    ),
  );
}
