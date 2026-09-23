import { Sparkles, FlaskConical, MonitorCog, BedDouble, ShieldCheck, HeartHandshake, BadgeDollarSign, Globe2, Layers3, Eye, Target, Gem, Scale, Clock3, Users, BriefcaseBusiness, RefreshCw } from 'lucide-react';
import { company } from './company';

export const sectors = [
  { slug: 'cleaning-items', name: 'Cleaning Items', number: '01', icon: Sparkles, tone: 'mint', tagline: 'Practical tools for cleaner, safer spaces.', description: 'We provide a wide range of cleaning items designed to support hygiene, cleanliness, and effective maintenance across commercial, institutional, hospitality, and everyday environments.', detail: 'Our focus is on reliable, practical cleaning products that meet business needs while maintaining quality and value.', label: 'We serve', items: ['Offices', 'Hotels', 'Restaurants', 'Hospitals & institutions', 'Commercial facilities', 'Residential and general-use requirements'] },
  { slug: 'chemical-business', name: 'Chemical', number: '02', icon: FlaskConical, tone: 'copper', tagline: 'Dependable solutions for specific applications.', description: 'Our Chemical sector supplies products for commercial and industrial requirements, sourced with attention to quality, consistency, and suitability for their intended applications.', detail: 'Whether for cleaning, maintenance, operational, or other business requirements, our goal is to provide reliable chemical solutions and professional service.', label: 'Our focus includes', items: ['Commercial chemicals', 'Cleaning chemicals', 'Maintenance-related chemical products', 'Industrial requirements', 'Business-specific chemical solutions'] },
  { slug: 'it-services', name: 'IT Services', number: '03', icon: MonitorCog, tone: 'blue', tagline: 'Technology that keeps business moving.', description: `Technology plays a vital role in modern business, and ${company.brandName} provides IT services designed to help organizations operate more effectively in a digital environment.`, detail: 'We understand each client’s requirements and provide practical, scalable solutions aligned with their business objectives and smooth day-to-day operations.', label: 'Our IT services', items: ['IT support and solutions', 'Technology consulting'] },
  { slug: 'hotel-supplies', name: 'Hotel Supplies', number: '04', icon: BedDouble, tone: 'sand', tagline: 'Operational essentials for thoughtful hospitality.', description: 'We provide hotel supplies that support the daily operational needs of hotels, guest houses, restaurants, and hospitality businesses.', detail: 'Our hospitality supply solutions focus on quality, functionality, consistency, and timely service, helping hospitality businesses maintain professional standards and deliver better guest experiences.', label: 'Our supply range can include', items: ['Guest-room supplies', 'Housekeeping supplies', 'Cleaning and hygiene products', 'Hospitality essentials', 'Operational supplies', 'Customized hotel requirements'] }
];

export const values = [
  { icon: Gem, title: 'Quality', text: 'Quality is fundamental to building customer trust and long-term relationships.' },
  { icon: Scale, title: 'Integrity', text: 'We conduct our business with honesty, transparency, and professional ethics.' },
  { icon: Clock3, title: 'Reliability', text: 'Our customers depend on us, and we strive to deliver consistently.' },
  { icon: Users, title: 'Customer Focus', text: 'We put our customers’ requirements at the center of our approach.' },
  { icon: BriefcaseBusiness, title: 'Professionalism', text: 'We maintain professional standards throughout our operations and relationships.' },
  { icon: RefreshCw, title: 'Continuous Improvement', text: 'We continuously look for better products, services, processes and solutions.' }
];

export const reasons = [
  { icon: Layers3, title: 'Diverse Portfolio', text: 'Multiple industries supported under one trusted brand.' },
  { icon: ShieldCheck, title: 'Quality Assurance', text: 'Products and services sourced with reliability in mind.' },
  { icon: HeartHandshake, title: 'Customer Focused', text: 'Solutions shaped around each client’s real requirements.' },
  { icon: BadgeDollarSign, title: 'Competitive Value', text: 'Value-conscious solutions without compromising standards.' },
  { icon: Globe2, title: 'Global Standards', text: 'A commitment to professionalism and international best practices.' }
];

export const purpose = [
  { icon: Target, eyebrow: 'Our mission', title: 'Earn trust at every step.', text: 'To become a trusted business partner by delivering quality products, reliable services, competitive value, and customer-focused solutions. We strive to understand our clients’ needs, maintain high standards, and build long-term relationships based on trust and mutual growth.' },
  { icon: Eye, eyebrow: 'Our vision', title: 'Simpler support. Stronger business.', text: 'To grow as a trusted, diversified business partner that makes procurement and business support simpler, more reliable and more efficient across every sector we serve.' },
  { icon: HeartHandshake, eyebrow: 'Our commitment', title: 'Dependability, made practical.', text: 'To provide dependable products, professional services, and lasting value to every customer we serve.' }
];
