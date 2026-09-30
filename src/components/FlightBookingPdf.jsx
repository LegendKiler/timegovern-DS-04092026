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
  label: { width: 140, color: '#6b7280', fontSize: 10 },
  value: { flex: 1, fontWeight: 'bold', fontSize: 11 },
  routeBox: { backgroundColor: '#eff6ff', borderRadius: 8, padding: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeCode: { fontSize: 32, fontWeight: 'bold', color: '#2563eb' },
  routeArrow: { fontSize: 20, color: '#9ca3af' },
  priceBox: { backgroundColor: '#eff6ff', borderRadius: 8, padding: 16, marginBottom: 16 },
  priceLabel: { fontSize: 10, color: '#2563eb', marginBottom: 4 },
  price: { fontSize: 26, fontWeight: 'bold', color: '#2563eb' },
  badge: { backgroundColor: '#dbeafe', color: '#1e40af', padding: 4, borderRadius: 4, fontSize: 9, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  footer: { marginTop: 30, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb', fontSize: 9, color: '#9ca3af', textAlign: 'center' },
  disclosure: { fontSize: 8, color: '#9ca3af', marginTop: 12, fontStyle: 'italic' },
})

function FlightVoucher({ flight, search }) {
  const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })
  const ref = 'TG-FL-' + Date.now().toString(36).toUpperCase().slice(-8)
  const depTime = flight.departure_at ? new Date(flight.departure_at) : null
  const retTime = flight.return_at ? new Date(flight.return_at) : null
  const fmtDate = (d) => d ? d.toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'
  const fmtPrice = (n) => Number(n || 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>timegovern</Text>
          <Text style={styles.subtitle}>Flight Booking Voucher - Generated {today}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.badge}>FLIGHT VOUCHER</Text>
          <View style={styles.row}><Text style={styles.label}>Reference:</Text><Text style={styles.value}>{ref}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Issued:</Text><Text style={styles.value}>{today}</Text></View>
        </View>

        <View style={styles.routeBox}>
          <Text style={styles.routeCode}>{flight.origin}</Text>
          <Text style={styles.routeArrow}>→</Text>
          <Text style={styles.routeCode}>{flight.destination}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Details</Text>
          <View style={styles.row}><Text style={styles.label}>Airline:</Text><Text style={styles.value}>{flight.airline || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Flight Number:</Text><Text style={styles.value}>{flight.flight_number || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Route:</Text><Text style={styles.value}>{flight.origin} → {flight.destination}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Stops:</Text><Text style={styles.value}>{flight.transfers === 0 ? 'Direct' : (flight.transfers || 0) + ' stop' + (flight.transfers > 1 ? 's' : '')}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Departure</Text>
          <View style={styles.row}><Text style={styles.label}>Date & Time:</Text><Text style={styles.value}>{fmtDate(depTime)}</Text></View>
        </View>

        {retTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Return</Text>
            <View style={styles.row}><Text style={styles.label}>Date & Time:</Text><Text style={styles.value}>{fmtDate(retTime)}</Text></View>
          </View>
        )}

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>TOTAL FLIGHT PRICE</Text>
          <Text style={styles.price}>{flight.currency || 'AUD'} {fmtPrice(flight.price)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>To Complete Your Booking</Text>
          <Text style={{ fontSize: 10, color: '#4a4a5a' }}>
            This voucher summarises the flight offer from Aviasales. To confirm and pay, visit the booking link below. The final price may change until the booking is completed with the airline.
          </Text>
          <Text style={{ fontSize: 9, color: '#2563eb', marginTop: 6 }}>{flight.link || 'See Aviasales.com'}</Text>
        </View>

        <Text style={styles.disclosure}>
          Voucher generated by timegovern.com. Flight prices are subject to change and availability. Please confirm all details with the airline before travel.
        </Text>

        <View style={styles.footer}>
          <Text>timegovern.com - Your worldwide time, travel and tools portal</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function downloadFlightVoucher(flight, search) {
  const blob = await pdf(<FlightVoucher flight={flight} search={search} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'timegovern-flight-voucher-' + Date.now() + '.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default FlightVoucher