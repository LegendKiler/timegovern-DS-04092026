import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import {  } from 'lucide-react'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica', color: '#1a1a2e' },
  header: { borderBottomWidth: 3, borderBottomColor: '#2563eb', paddingBottom: 12, marginBottom: 20 },
  brand: { fontSize: 24, fontWeight: 'bold', color: '#2563eb', marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#6b7280' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#2563eb', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 4 },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { width: 120, color: '#6b7280', fontSize: 10 },
  value: { flex: 1, fontWeight: 'bold', fontSize: 11 },
  priceBox: { backgroundColor: '#eff6ff', borderRadius: 8, padding: 16, marginTop: 8, marginBottom: 16 },
  priceLabel: { fontSize: 10, color: '#2563eb', marginBottom: 4 },
  price: { fontSize: 26, fontWeight: 'bold', color: '#2563eb' },
  pricePerDay: { fontSize: 10, color: '#6b7280', marginTop: 2 },
  footer: { marginTop: 30, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb', fontSize: 9, color: '#9ca3af', textAlign: 'center' },
  badge: { backgroundColor: '#dbeafe', color: '#1e40af', padding: 4, borderRadius: 4, fontSize: 9, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  disclosure: { fontSize: 8, color: '#9ca3af', marginTop: 12, fontStyle: 'italic' },
})

function CarVoucher({ car, booking }) {
  const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })
  const ref = 'TG-' + Date.now().toString(36).toUpperCase().slice(-8)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>timegovern</Text>
          <Text style={styles.subtitle}>Car Rental Voucher - Generated {today}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.badge}>RESERVATION VOUCHER</Text>
          <View style={styles.row}><Text style={styles.label}>Reference:</Text><Text style={styles.value}>{ref}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Issued:</Text><Text style={styles.value}>{today}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.row}><Text style={styles.label}>Vehicle:</Text><Text style={styles.value}>{car.name || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Vendor:</Text><Text style={styles.value}>{car.vendor || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Category:</Text><Text style={styles.value}>{car.category || 'N/A'} ({car.sipp || 'N/A'})</Text></View>
          <View style={styles.row}><Text style={styles.label}>Transmission:</Text><Text style={styles.value}>{car.transmission || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Passengers:</Text><Text style={styles.value}>{car.passengers || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Doors:</Text><Text style={styles.value}>{car.doors || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Air Con:</Text><Text style={styles.value}>{car.air_con ? 'Yes' : 'No'}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.row}><Text style={styles.label}>Pickup:</Text><Text style={styles.value}>{booking.pickupDate} at {booking.pickupTime || '12:00'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Location:</Text><Text style={styles.value}>{booking.location}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Dropoff:</Text><Text style={styles.value}>{booking.dropoffDate} at {booking.dropoffTime || '12:00'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Driver Age:</Text><Text style={styles.value}>{booking.age || 30}</Text></View>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>TOTAL RENTAL PRICE</Text>
          <Text style={styles.price}>{car.currency || 'EUR'} {car.price?.toFixed(2) || '0.00'}</Text>
          {car.price_per_day && <Text style={styles.pricePerDay}>Approx. {car.currency || 'EUR'} {car.price_per_day.toFixed(2)} / day</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inclusions</Text>
          {car.included_protections?.map((p, i) => (
            <View key={i} style={styles.row}><Text style={styles.value}>• {p}</Text></View>
          ))}
          {car.free_cancellation && <View style={styles.row}><Text style={styles.value}>• Free cancellation</Text></View>}
          {car.mileage && <View style={styles.row}><Text style={styles.value}>• Mileage: {car.mileage}</Text></View>}
          {car.fuel_policy && <View style={styles.row}><Text style={styles.value}>• Fuel: {car.fuel_policy}</Text></View>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need to Book?</Text>
          <Text style={{ fontSize: 10, color: '#4a4a5a' }}>
            This voucher summarises the rental offer. To confirm your booking, visit the vendor link below. Booking links may contain affiliate attribution.
          </Text>
          <Text style={{ fontSize: 9, color: '#2563eb', marginTop: 6 }}>{car.booking_url || 'See vendor website'}</Text>
        </View>

        <Text style={styles.disclosure}>
          Voucher generated by timegovern.com. Prices are subject to change until confirmed with the vendor. Terms and conditions apply.
        </Text>

        <View style={styles.footer}>
          <Text>timegovern.com - Your worldwide time, travel and tools portal</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function downloadCarVoucher(car, booking) {
  const blob = await pdf(<CarVoucher car={car} booking={booking} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'timegovern-car-voucher-' + Date.now() + '.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default CarVoucher