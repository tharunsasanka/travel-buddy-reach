import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.brand}><Text style={styles.logo}>TB</Text><Text style={styles.brandText}>Travel Buddy Reach</Text></View>
    <Text style={styles.kicker}>LAST-MILE TRAVEL INTELLIGENCE</Text><Text style={styles.title}>Know before the last turn.</Text><Text style={styles.lead}>Check the final road, parking point, walking distance and recent access conditions.</Text>
    <TextInput style={styles.search} placeholder="Search waterfalls, trails, viewpoints…" placeholderTextColor="#809087"/>
    <Text style={styles.section}>Recommended for your vehicle</Text>
    <Link href="/destination/bomburu-ella" style={styles.card}><Text style={styles.cardLabel}>84% JOURNEY CONFIDENCE</Text><Text style={styles.cardTitle}>Bomburu Ella</Text><Text style={styles.cardMeta}>Nuwara Eliya · 1.4 km walk</Text><Text style={styles.warning}>● Muddy access · updated 6 days ago</Text></Link>
    <View style={styles.tip}><Text style={styles.tipTitle}>Set up your Vehicle Passport</Text><Text style={styles.tipBody}>Get answers matched to your vehicle, walking limit and travel group.</Text></View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#f6f3ea'},page:{padding:24,gap:16},brand:{flexDirection:'row',alignItems:'center',gap:10,marginBottom:35},logo:{backgroundColor:'#173f32',color:'#fff',padding:10,borderRadius:11,fontWeight:'800'},brandText:{fontWeight:'800',color:'#17352c'},kicker:{fontSize:11,letterSpacing:1.6,color:'#dc653c',fontWeight:'800'},title:{fontSize:46,lineHeight:48,fontWeight:'800',color:'#17352c'},lead:{fontSize:17,lineHeight:26,color:'#5c7169'},search:{marginTop:12,backgroundColor:'#fff',padding:17,borderRadius:16,fontSize:15},section:{marginTop:22,fontSize:20,fontWeight:'800',color:'#17352c'},card:{backgroundColor:'#173f32',padding:24,borderRadius:22,color:'#fff'},cardLabel:{fontSize:10,color:'#f1a17e',fontWeight:'800'},cardTitle:{fontSize:30,color:'#fff',fontWeight:'800',marginTop:16},cardMeta:{color:'#b6cbc2',marginTop:4},warning:{color:'#ffd08b',marginTop:20},tip:{backgroundColor:'#dce8d4',padding:22,borderRadius:18,marginTop:10},tipTitle:{fontWeight:'800',fontSize:18,color:'#17352c'},tipBody:{color:'#5d736b',lineHeight:21,marginTop:6}});
