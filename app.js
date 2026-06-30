/* ==========================================================================
   MAGNUMKARE APPOINTMENT BOOKING SYSTEM - STATE ENGINE
   Authentic Shahjahanpur City Doctors Directory (Satyanand, Jagmohan Lal, Jain Hospitals)
   Interactive router, search, slot pickers, and live simulator logs
   ========================================================================== */

// --- Specialty Lookup Map (Used for internal categorizations) ---
const SPECIALTIES = {
  ortho: "Orthopedics",
  neuro: "Neurology",
  eye: "Ophthalmology (Eye Care)",
  pediatric: "Pediatrics (Child Care)",
  gyne: "Gynecology & Obstetrics",
  ent: "ENT Specialists",
  dental: "Orthodontist (Dentistry)",
  patho: "Pathology & Diagnostics",
  derma: "Dermatology (Skin Care)",
  chest: "Pulmonology & Chest Care",
  medicine: "General Medicine / Internal Medicine",
  surgery: "General & Laparoscopic Surgery",
  urology: "Urology (Urinary & Kidney Care)"
};

// --- Real Shahjahanpur Specialists Database (Sourced from Hospital portals) ---
const DOCTORS = [
  {
    id: "doc-manmohan",
    name: "Dr. Manmohan Lal Gupta",
    degrees: "MBBS, MS - Ophthalmology (Eye Surgeon)",
    specialty: "eye",
    experience: "15+ Years",
    rating: "4.9",
    reviewsCount: 245,
    hospital: "Jagmohan Lal Hospital",
    fees: "₹400",
    location: "Pahla Gol Chakkar, near Bareilly Mod, Avas Vikas, Shahjahanpur",
    avatar: "https://jagmohanlalhospital.in/assets/images/leader.jpg",
    bio: "Dr. Manmohan Lal Gupta is the esteemed Founder, Chairman, and Director of Jagmohan Lal Hospital in Shahjahanpur. After completing his MBBS and MS in Ophthalmology, he pursued a prestigious Fellowship in PHACO Surgery from Dr. Shroff's Charity Eye Hospital, New Delhi, and Sadguru Netra Chikitsalaya (SNC), Chitrakoot. He has over 15 years of dedicated ophthalmic practice and has successfully performed more than 16,000 surgeries, including advanced modular micro-incision cataract surgery, customized LASIK laser vision correction, and clinical glaucoma treatments.",
    socials: {
      instagram: "https://www.instagram.com/jagmohanlalhospital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=61581824104566",
      gmb: "https://www.google.com/maps/search/Jagmohan+Lal+Eye+and+ENT+Hospital+Shahjahanpur",
      website: "https://jagmohanlalhospital.in/"
    },
    testimonials: [
      { id: "jm1", patient: "Vijay Singh, Shahjahanpur", text: "Dr. Manmohan performed cataract surgery on my mother. Her vision is perfectly restored now! High-end hospital services.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
      { id: "jm2", patient: "Pooja Devi, Bareilly Mod", text: "Very precise diagnosis and compassionate advice. Highly recommend the LASIK surgery center.", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-gaurav",
    name: "Dr. Gaurav Mishra",
    degrees: "MBBS, MD - Pediatrics & Child Specialist",
    specialty: "pediatric",
    experience: "15+ Years",
    rating: "4.9",
    reviewsCount: 198,
    hospital: "Satyanand Hospital Shahjahanpur",
    fees: "₹350",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/gaurav.webp",
    bio: "Dr. Gaurav Mishra is a highly respected Pediatric Consultant and Neonatologist in Shahjahanpur. Formerly an expert pediatric fellow at K.G.M.U. Lucknow, he has 15+ years of clinical experience. He specializes in pediatric intensive care support (PICU), critical newborn neonatology treatments, childhood respiratory disorders, and adolescent development plans.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Satyanand+Hospital+Shahjahanpur"
    },
    testimonials: [
      { id: "sn1", patient: "Gaurav Singh, Shahjahanpur", text: "Dr. Gaurav Mishra is the absolute best pediatrician in Shahjahanpur. Mustufa Bhai in the PICU is also extremely polite and helpful.", thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-skjain",
    name: "Dr. S.K. Jain",
    degrees: "MBBS, MD - Senior Pediatric Consultant",
    specialty: "pediatric",
    experience: "25+ Years",
    rating: "4.9",
    reviewsCount: 310,
    hospital: "Jain Hospital Shahjahanpur",
    fees: "₹400",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://jainhospitalspn.in/assets/images/team/h1_1.png",
    bio: "Dr. S.K. Jain is the chief pediatric consultant and neonatologist at Jain Hospital with more than 25 years of rich experience in childcare. He is deeply trusted in Shahjahanpur for neonatology critical care support, complex pediatric infectious disease therapies, and pediatric emergency life support.",
    socials: {
      instagram: "https://www.instagram.com/jain_hospital_shahjahanpur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100077465092586",
      gmb: "https://share.google/ZVVD9I7P5Rk6lOrJ2",
      website: "https://jainhospitalspn.in/"
    },
    testimonials: [
      { id: "jn1", patient: "Pawan Pandit, Shahjahanpur", text: "My child had severe typhoid, but Dr. S.K. Jain started the correct treatment instantly. He is the most trusted child specialist in this city.", thumb: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-amitajain",
    name: "Dr. Amita Jain",
    degrees: "MBBS, MS - Senior Gynaecologist & Obstetrician",
    specialty: "gyne",
    experience: "20+ Years",
    rating: "4.8",
    reviewsCount: 165,
    hospital: "Jain Hospital Shahjahanpur",
    fees: "₹400",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://jainhospitalspn.in/assets/images/team/h1_2.png",
    bio: "Dr. Amita Jain is the senior Director and Gynecology Consultant at Jain Hospital. With over 20 years of clinical excellence, she specializes in painless delivery procedures, high-risk pregnancy management, laparoscopy surgeries, and maternal health support systems.",
    socials: {
      instagram: "https://www.instagram.com/jain_hospital_shahjahanpur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100077465092586",
      gmb: "https://share.google/ZVVD9I7P5Rk6lOrJ2",
      website: "https://jainhospitalspn.in/"
    },
    testimonials: [
      { id: "jn2", patient: "Akansha Singh, Shahjahanpur", text: "I went there for my mother's treatment. Sabha, Sharda, and Faizan took amazing care of her. Very dedicated doctors and staff.", thumb: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-meghagupta",
    name: "Dr. Megha Gupta",
    degrees: "MBBS, MS - Gynaecologist & IVF Specialist",
    specialty: "gyne",
    experience: "10+ Years",
    rating: "4.9",
    reviewsCount: 120,
    hospital: "Umeed IVF & Fertility Center SPN",
    fees: "₹400",
    location: "Jain Hospital Campus, Azizganj, Shahjahanpur",
    avatar: "https://jainhospitalspn.in/assets/images/team/h1_3.png",
    bio: "Dr. Megha Gupta is a dedicated clinical infertility specialist and gynecological surgeon. At Umeed IVF Center, she offers advanced fertility therapies, intrauterine insemination (IUI), in-vitro fertilization (IVF), and laparoscopic gynecological surgeries with advanced precision protocols.",
    socials: {
      instagram: "https://www.instagram.com/jain_hospital_shahjahanpur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100077465092586",
      gmb: "https://share.google/ZVVD9I7P5Rk6lOrJ2",
      website: "https://jainhospitalspn.in/"
    },
    testimonials: [
      { id: "jn3", patient: "Rekha Sharma, Shahjahanpur", text: "Dr. Megha Gupta's fertility treatment is highly advanced and scientific. The Umeed Center is a blessing for families in SPN.", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-induyadav",
    name: "Dr. Indu Yadav",
    degrees: "MBBS, MD - Gynaecology & Obstetrics",
    specialty: "gyne",
    experience: "14+ Years",
    rating: "4.8",
    reviewsCount: 140,
    hospital: "Satyanand Hospital Shahjahanpur",
    fees: "₹400",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/indu.webp",
    bio: "Dr. Indu Yadav is a highly respected gynaecologist at Satyanand Hospital. Specialized in painless delivery, high-risk pregnancy diagnostics, laparoscopy interventions, and maternal care, she focuses on comfortable and safe clinical treatments.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Satyanand+Hospital+Shahjahanpur"
    },
    testimonials: [
      { id: "sn2", patient: "Preeti Mishra, Shahjahanpur", text: "Very friendly and competent doctor. She handled my pregnancy complications with absolute ease. Excellent hospital.", thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-saurabhmishra",
    name: "Dr. Saurabh Mishra",
    degrees: "MBBS, MD - Consultant Anaesthesiology & ICU",
    specialty: "ent",
    experience: "12+ Years",
    rating: "4.8",
    reviewsCount: 99,
    hospital: "Satyanand Hospital Shahjahanpur",
    fees: "₹300",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/saurabh.webp",
    bio: "Dr. Saurabh Mishra is the chief Anaesthesiology and Intensive Care Consultant at Satyanand Hospital. He manages advanced critical care ventilation, postoperative analgesia, emergency trauma support, and acute pain blocks under the MagnumKare network.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Satyanand+Hospital+Shahjahanpur"
    },
    testimonials: [
      { id: "sn3", patient: "Subhash Yadav, Shahjahanpur", text: "Dr. Saurabh and his ICU team are incredibly alert. Highly professional services during my father's surgery.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-puneetjain",
    name: "Dr. Puneet Jain",
    degrees: "BDS, MDS - Consultant Orthodontist",
    specialty: "dental",
    experience: "12+ Years",
    rating: "4.8",
    reviewsCount: 115,
    hospital: "Precision Smiles Dental Clinic SPN",
    fees: "₹300",
    location: "Jain Hospital Campus, Azizganj, Shahjahanpur",
    avatar: "https://jainhospitalspn.in/assets/images/team/h1_4.png",
    bio: "Dr. Puneet Jain is the chief dental surgeon and orthodontist at Precision Smiles SPN. He has successfully designed over 800 dental alignment cases and is specialized in metal/ceramic braces, invisible aligners, dental implants, and pediatric smile treatments.",
    socials: {
      instagram: "https://www.instagram.com/jain_hospital_shahjahanpur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100077465092586",
      gmb: "https://share.google/ZVVD9I7P5Rk6lOrJ2",
      website: "https://jainhospitalspn.in/"
    },
    testimonials: [
      { id: "jn4", patient: "Abhinav Gupta, Shahjahanpur", text: "Fantastic dental alignment. The invisible aligner therapy was painless and extremely successful.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-shwetamishra",
    name: "Dr. Shweta Mishra",
    degrees: "MBBS, MD - Biochemistry & Pathology Director",
    specialty: "patho",
    experience: "10+ Years",
    rating: "4.7",
    reviewsCount: 77,
    hospital: "Satyanand Diagnostic Labs SPN",
    fees: "₹300",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/shweta.webp",
    bio: "Dr. Shweta Mishra directs the advanced diagnostic laboratory and biochemistry services at Satyanand Hospital. Formerly clinical biochemist at GMC Patiala, she specializes in endocrine profiling, tumor markers, and automated molecular pathology.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Satyanand+Hospital+Shahjahanpur"
    },
    testimonials: [
      { id: "sn4", patient: "Kunal Singh, Shahjahanpur", text: "Satyanand Diagnostic Labs provides very accurate biochemical reports. Dr. Shweta is an expert leader.", thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-shakir",
    name: "Dr. Shakir",
    degrees: "MBBS, MCh - Neurosurgery (Consultant Neurosurgeon)",
    specialty: "neuro",
    experience: "12+ Years",
    rating: "4.9",
    reviewsCount: 184,
    hospital: "Dr. Shakir Neurosurgery Clinic SPN",
    fees: "₹500",
    location: "Bareilly Road, Shahjahanpur",
    avatar: "https://www.drshakirneurosurgeon.com/img/Shakir_about.jpg",
    bio: "Dr. Shakir is a highly qualified and skilled Consultant Neurosurgeon in Shahjahanpur. He specializes in micro-neurosurgery, complex brain tumor surgeries, endoscopic spine procedures, disc replacement surgeries, and trauma care management.",
    socials: {
      instagram: "https://www.instagram.com/neurosurgeon_doc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/msshakirsha",
      gmb: "https://www.google.com/search?q=Dr+Shakir+Neurosurgeon+Shahjahanpur",
      website: "https://www.drshakirneurosurgeon.com/"
    },
    testimonials: [
      { id: "sh1", patient: "Mohit Verma, Shahjahanpur", text: "Dr. Shakir is a godsend for spine patients. His micro-neurosurgery cured my chronic back pain entirely.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-pradeep",
    name: "Dr. Pradeep Yadav",
    degrees: "MBBS, MS - Orthopaedics (Joint Replacement & Spine Specialist)",
    specialty: "ortho",
    experience: "10+ Years",
    rating: "4.8",
    reviewsCount: 156,
    hospital: "Dr. Pradeep Yadav Orthopaedic Center SPN",
    fees: "₹400",
    location: "Civil Lines, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/pradeepyadav.webp",
    bio: "Dr. Pradeep Yadav is a distinguished Orthopaedic surgeon in Shahjahanpur, known for his expertise in knee & hip joint replacements, complex fracture management, arthroscopic ligament repairs, and advanced spine and arthritis treatments.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Dr+Pradeep+Yadav+Ortho+Shahjahanpur",
      website: "https://www.drpradeepyadavortho.com/"
    },
    testimonials: [
      { id: "py1", patient: "Rajesh Kumar, Shahjahanpur", text: "Excellent knee replacement surgery. My father started walking comfortably within a few weeks.", thumb: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-ankitaverma",
    name: "Dr. Ankita Verma",
    degrees: "MBBS, MD - Pulmonary Medicine (Chest Specialist)",
    specialty: "chest",
    experience: "15+ Years",
    rating: "4.9",
    reviewsCount: 145,
    hospital: "Aaradhya Chest & Respiratory Center",
    fees: "₹400",
    location: "Avas Vikas, Shahjahanpur",
    avatar: "assets/images/ankita_verma.png",
    bio: "Dr. Ankita Verma is a highly distinguished Pulmonary Medicine specialist and chest specialist in Shahjahanpur. Serving as the chief consultant at Aaradhya Chest & Respiratory Center in Avas Vikas and also consulting at Satyanand Hospital, she holds over 15 years of rich clinical experience. She previously served as an Assistant Professor at Autonomous State Medical College (ASMC), Shahjahanpur, and Senior Resident at Varun Arjun Medical College. She specializes in the diagnosis and management of chronic respiratory diseases, asthma, COPD, tuberculosis (TB), sleep apnea, pneumonia, and complex lung infections, utilizing advanced diagnostic services like Pulmonary Function Tests (PFT).",
    socials: {
      instagram: "https://www.instagram.com/dr__ankita_verma?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/ankita.verma.5245961",
      gmb: "https://www.google.com/maps/search/Aaradhya+Chest+Respiratory+Center+Dr+Ankita+Verma+Shahjahanpur"
    },
    testimonials: [
      { id: "ak1", patient: "Rohan Verma, Shahjahanpur", text: "Dr. Ankita Verma is an exceptional doctor. Her diagnosis of my father's severe chronic cough was accurate and the treatment gave instant relief. Aaradhya Center is very modern and well-equipped.", thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-ushachandra",
    name: "Dr. Usha Chandra",
    degrees: "MBBS, MD (Dermatology) - BHU (Board Certified)",
    specialty: "derma",
    experience: "15+ Years",
    rating: "4.9",
    reviewsCount: 142,
    hospital: "Shree Balaji Skin Care Clinic",
    fees: "₹400",
    location: "108 Kacha Mod, Kuchha Kathara, Shahjahanpur",
    avatar: "https://drushachandraderma.com/Assets/about-image-1.jpg",
    bio: "Dr. Usha Chandra is a prominent board-certified dermatologist and aesthetic skin consultant in Shahjahanpur. Holding an MBBS and MD in Dermatology from the prestigious Banaras Hindu University (BHU), she previously served as an expert dermatologist at K.G.M.U. (Lucknow) and L.L.R.M. (Meerut). At Shree Balaji Skin Care Clinic, she provides advanced clinical care for acne, melasma, psoriasis, complex hair fall conditions (including GFC therapies), and premium anti-aging aesthetic procedures.",
    socials: {
      instagram: "https://www.instagram.com/dr_usha_chandra_dermatologist?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/ushachandra24",
      gmb: "https://share.google/dApdpS9RQ8OkcDSBr",
      website: "https://drushachandraderma.com/"
    },
    testimonials: [
      { id: "uc1", patient: "Kiran Saxena, Shahjahanpur", text: "Amazing results for skin treatment and pigmentation. She listens very patiently and details the prescription.", thumb: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-shubhamjain",
    name: "Dr. Shubham Jain",
    degrees: "MBBS, MD - Respiratory Medicine (Chest Specialist)",
    specialty: "chest",
    experience: "8+ Years",
    rating: "4.9",
    reviewsCount: 215,
    hospital: "Neeraj Chest Care Centre",
    fees: "₹400",
    location: "Jail Road, Bijlipura, Shahjahanpur",
    avatar: "assets/images/shubham_jain.png",
    bio: "Dr. Shubham Jain is a highly qualified pulmonologist and chest specialist practicing in Shahjahanpur. Operating out of the Neeraj Chest Care Centre, he specializes in respiratory medicine, offering comprehensive diagnostic and therapeutic care for asthma, chronic obstructive pulmonary disease (COPD), tuberculosis (TB), chronic cough, pneumonia, and complex chest infections.",
    socials: {
      instagram: "https://www.instagram.com/chestphysician.spn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/dr.shubhamedo",
      gmb: "https://www.google.com/search?q=neeraj+chest+care+centre+shahjahanpur&oq=neer&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgYIAhAjGCcyDwgDEC4YQxixAxiABBiKBTIPCAQQABhDGLEDGIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTc3NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#sv=CAwSqwMKBmxjbF9wdhJGCgNwdnESP0NnMHZaeTh4TVhrMGJEZzJaSEIzSWg0S0dHNWxaWEpoYWlCamFHVnpkQ0JqWVhKbElHTmxiblJ5WlJBQ0dBTRKEAgoDbHFpEvwBQ2lWdVpXVnlZV29nWTJobGMzUWdZMkZ5WlNCalpXNTBjbVVnYzJoaGFHcGhhR0Z1Y0hWeVNMdmxqS1NTdllDQUNGb3pFQUFRQVJBQ0VBTVlBUmdFSWlWdVpXVnlZV29nWTJobGMzUWdZMkZ5WlNCalpXNTBjbVVnYzJoaGFHcGhhR0Z1Y0hWeVtnRUdaRzlqZEc5eW1nRkVRMms1UkZGVmJGSlJWVTUyV2tWT2IyUkliR3BTYW14MlZESjRZVkpHWjNsWGF6VlVWMGRvU2xaRlVuTldiRTVYWWtST1YySlZOSGhaYTFaSFRXeGFkRmw0UVVMNkFRUUlBQkF2EhIKA3RicxILbHJmOiEzc0lBRT0SKgoBcRIlbmVlcmFqIGNoZXN0IGNhcmUgY2VudHJlIHNoYWhqYWhhbnB1choSbG9jYWwtcGxhY2Utdmlld2VyGAoguLWimQI"
    },
    testimonials: [
      { id: "nr1", patient: "Aalok Pathak, Shahjahanpur", text: "Neeraj Chest Care Centre has the best treatment for lung diseases. Dr. Shubham Jain's diagnosis of my chronic asthma was highly accurate.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-rishabh",
    name: "Dr. Rishabh Nayak",
    degrees: "MBBS, MD - General Medicine Specialist",
    specialty: "medicine",
    experience: "3+ Years",
    rating: "4.9",
    reviewsCount: 45,
    hospital: "Satyanand Hospital Shahjahanpur",
    fees: "₹300",
    location: "Azizganj, Shahjahanpur",
    avatar: "https://www.satyanandhospital.co.in/images/doctors/rishabh.webp",
    bio: "Dr. Rishabh Nayak is a highly qualified and dedicated Medicine Specialist at Satyanand Hospital, Shahjahanpur. With a strong educational background holding his M.B.B.S. from GMC Nagpur and his M.D. from RML Delhi, he brings 3+ years of clinical excellence in Internal Medicine. He specializes in the comprehensive medical management of chronic disorders, thyroid & hormone care, diabetes, pulmonology, gastroenterology, and adult comprehensive healthcare.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/search?q=Satyanand+Hospital+Shahjahanpur",
      website: "https://www.satyanandhospital.co.in/doctors/medicine-dr-rishabhnayak.html"
    },
    testimonials: [
      { id: "rn1", patient: "Mrs. Nisha Sharma, Shahjahanpur", text: "Dr. Rishabh Nayak diagnosed my mother's diabetes perfectly. His patient listening and accurate medical advice are highly commendable.", thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-akash",
    name: "Dr. Akash",
    degrees: "MBBS, MS - General Surgery, DNB - General Surgery, FMAS",
    specialty: "surgery",
    experience: "7+ Years",
    rating: "4.9",
    reviewsCount: 96,
    hospital: "Gastro Clinic 27",
    fees: "₹400",
    location: "Kaccha katra mod, sinzai, Near saraswati shishu mandir, Hadaf, Shahjahanpur",
    avatar: "https://images1-fabric.practo.com/doctor/1380758/dr-akash-69201041276bf.png",
    bio: "Dr. Akash is a highly skilled General & Laparoscopic Surgeon dedicated to providing honest, ethical, and patient-centered care in Shahjahanpur. He has over 7 years of rich clinical experience. He specializes in advanced minimally invasive laparoscopic surgeries for gallstones, hernia, appendicitis, and piles/fissure/fistula, as well as breast surgeries and OPD consultations. He focuses on precise diagnosis, transparent communication, and ensuring a fast, comfortable recovery for all patients close to their home.",
    socials: {
      gmb: "https://www.google.com/search?q=Gastro+Clinic+27+Hadaf+Shahjahanpur"
    },
    testimonials: [
      { id: "akash-t1", patient: "Aman Bajpai, Hadaf", text: "Got my laparoscopic gallstone surgery done by Dr. Akash. He explained the procedure very clearly and the recovery was extremely smooth.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-shailendra",
    name: "Dr. Shailendra Kishore Verma",
    degrees: "MBBS, MD",
    specialty: "medicine",
    experience: "10+ Years",
    rating: "4.9",
    reviewsCount: 188,
    hospital: "Senior Care Clinic",
    fees: "₹300",
    location: "Super Market, Star Marriage Lawn, Behind Kanojia Hospital, Shahjahanpur",
    avatar: "assets/images/shailendra_verma.jpg",
    bio: "Dr. Shailendra Kishore Verma is an AIIMS New Delhi–trained expert physician dealing with medical diseases across all age patients. Experienced in Ward, HDU, and ICU patient care, including critical care and COVID-19 management. Special interest in geriatric medicine, multimorbidity, frailty, and polypharmacy. Committed to evidence-based, ethical, and patient-centred healthcare.",
    socials: {
      instagram: "https://www.instagram.com/dr_shailen_md/",
      facebook: "https://www.facebook.com/profile.php?id=61591242321982",
      gmb: "https://www.google.com/maps/search/Dr+Shailendra+Kishore+Verma+Senior+Care+Clinic+Shahjahanpur",
      website: "https://skv625.com/"
    },
    testimonials: [
      { id: "skv-t1", patient: "R. P. Saxena, Civil Lines", text: "Dr. Shailendra's geriatric health package is a blessing for senior citizens in Shahjahanpur. Very detailed health monitoring.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-tanmay",
    name: "Dr. Tanmay Agrawal",
    degrees: "MBBS, MD, DM (Cardiology) - Senior Cardiologist",
    specialty: "cardio",
    experience: "10+ Years",
    rating: "4.9",
    reviewsCount: 125,
    hospital: "Clara Swain Mission Hospital",
    fees: "₹500",
    location: "Civil Lines, Bareilly, Uttar Pradesh",
    avatar: "assets/images/tanmay_agrawal.png",
    bio: "Dr. Tanmay Agrawal is a highly distinguished Senior Interventional Cardiologist at Clara Swain Mission Hospital, Bareilly. He completed his MBBS, MD in General Medicine (SRMS Bareilly), and DM in Cardiology from the prestigious U.N. Mehta Institute of Cardiology and Research Centre, Ahmedabad. With over a decade of clinical experience, Dr. Agrawal has served at renowned institutions including Rajiv Gandhi Super Specialty Hospital, Delhi. He is widely recognized for performing Bareilly's first revolutionary leadless pacemaker implantation (Medtronic Micra VR Two), completed in a record 25 minutes without any incision or wires. He specializes in complex angioplasties, coronary stenting, pacemaker implantations, and comprehensive heart failure management.",
    socials: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      gmb: "https://www.google.com/maps/search/Clara+Swain+Mission+Hospital+Bareilly",
      website: "https://share.google/jwdKX27gUbC4kG6aY"
    },
    testimonials: [
      { id: "tanmay-t1", patient: "Raman Pratap, Bareilly", text: "Dr. Tanmay Agrawal performed angioplasty on my mother at Clara Swain Mission Hospital. He is a savior! Incredibly skilled cardiologist.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: "doc-mahesh",
    name: "Dr. Mahesh Tripathi",
    degrees: "MBBS, MS, M.Ch (Urology)",
    specialty: "urology",
    experience: "10+ Years",
    rating: "4.9",
    reviewsCount: 112,
    hospital: "Satyanand Hospital",
    fees: "₹600",
    location: "Azizganj, Shahjahanpur",
    avatar: "assets/images/mahesh_tripathi.png",
    bio: "Dr. Mahesh Tripathi is a distinguished Urology specialist at Satyanand Hospital, Azizganj, Shahjahanpur. With over a decade of experience, Dr. Tripathi brings a wealth of expertise and compassion to his practice. His attainment of a Master of Chirurgiae (M.Ch) in Urology reflects his dedication to mastering the complexities of urological medicine, ensuring the delivery of advanced and specialized care.",
    socials: {
      instagram: "https://www.instagram.com/satyanandhospitalpvt.ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=100065378743239",
      gmb: "https://www.google.com/maps/search/Satyanand+Hospital+Azizganj+Shahjahanpur",
      website: "https://www.satyanandhospital.co.in/doctors/uro-surgery-dr-maheshtripati.html"
    },
    testimonials: [
      { id: "mahesh-t1", patient: "Rajesh Kumar, Shahjahanpur", text: "Highly skilled urosurgeon. Dr. Mahesh successfully treated my kidney stone problem at Satyanand Hospital. Outstanding care.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  }
];

// --- Application Core State ---
const State = {
  activeScreen: "specialties-screen", // Refers to the main directory screen
  selectedSpecialty: null,
  selectedDoctor: null,
  bookings: [],
  notifications: [],
  unreadNotificationsCount: 0,
  uploadedFileName: null,
  isAuthorized: false,
  partnerId: "",
  chatLanguage: "english"
};

// --- DOM References ---
const DOM = {
  screens: {
    specialties: document.getElementById("specialties-screen"), // This is our Home Screen Directory
    profile: document.getElementById("profile-screen"),
    form: document.getElementById("form-screen"),
    confirmation: document.getElementById("confirmation-screen")
  },
  doctorsDirectory: document.getElementById("doctors-directory"),
  doctorProfileGrid: document.getElementById("doctor-profile-grid"),
  bookingFormEl: document.getElementById("booking-form-el"),
  bookingFormTitle: document.getElementById("booking-form-title"),
  confirmationCardContainer: document.getElementById("confirmation-card-container"),

  // Search
  searchInput: document.getElementById("search-input"),

  // Drawer Testimonials
  drawerBackdrop: document.getElementById("drawer-backdrop"),
  testimonialDrawer: document.getElementById("testimonial-drawer"),
  testimonialDrawerTitle: document.getElementById("drawer-doctor-title"),
  testimonialsScrollBox: document.getElementById("testimonials-scroll-box"),
  closeDrawerBtn: document.getElementById("close-drawer-btn"),

  // Notification elements
  bellBtn: document.getElementById("bell-btn"),
  bellBadge: document.getElementById("bell-badge"),
  notifDrawerBackdrop: document.getElementById("notif-drawer-backdrop"),
  notifDrawer: document.getElementById("notif-drawer"),
  notifScroll: document.getElementById("notif-scroll"),
  closeNotifBtn: document.getElementById("close-notif-btn"),
  toastContainer: document.getElementById("toast-container"),

  // Chatbot Elements
  chatbotLauncher: document.getElementById("chatbot-launcher"),
  chatbotLauncherBadge: document.getElementById("chatbot-launcher-badge"),
  chatbotPanel: document.getElementById("chatbot-panel"),
  chatbotMessagesContainer: document.getElementById("chatbot-messages-container"),
  chatbotTextInput: document.getElementById("chatbot-text-input"),
  chatbotSendBtn: document.getElementById("chatbot-send-btn"),
  chatbotCloseBtn: document.getElementById("chatbot-close-btn"),
  chatbotAttachBtn: document.getElementById("chatbot-attach-btn"),
  chatbotFileInput: document.getElementById("chatbot-file-input"),
  chatbotHeaderMode: document.getElementById("chatbot-header-mode"),
  chatbotStatusDot: document.getElementById("chatbot-status-dot")
};

// --- SPA Router ---
function navigateTo(screenId) {
  // Hide active, show target
  Object.keys(DOM.screens).forEach(key => {
    DOM.screens[key].classList.remove("active");
  });

  const targetScreen = document.getElementById(`${screenId}-screen`);
  if (targetScreen) {
    targetScreen.classList.add("active");
    State.activeScreen = `${screenId}-screen`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- Dynamic Renders ---

// Render 1: Home Screen Doctors Directory
function renderDoctorsDirectory(filterQuery = "") {
  if (!DOM.doctorsDirectory) return;
  DOM.doctorsDirectory.innerHTML = "";

  const query = filterQuery.toLowerCase().trim();

  const filteredDoctors = DOCTORS.filter(doc => {
    const specLabel = SPECIALTIES[doc.specialty] || "";
    return doc.name.toLowerCase().includes(query) ||
      doc.degrees.toLowerCase().includes(query) ||
      doc.hospital.toLowerCase().includes(query) ||
      doc.location.toLowerCase().includes(query) ||
      specLabel.toLowerCase().includes(query);
  });

  // Sort doctors in alphabetical order by name
  filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));

  if (filteredDoctors.length === 0) {
    DOM.doctorsDirectory.innerHTML = `
      <div class="glass-panel" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); width: 100%;">
        <i data-lucide="frown" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--cyan);"></i>
        <h3 class="doc-name" style="margin-bottom: 8px;">No Specialists Found</h3>
        <p class="doc-degrees" style="text-transform: none; color: var(--text-muted);">Try searching for doctor names, hospitals, or specialties (e.g. eye, pediatrics).</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filteredDoctors.forEach(doc => {
    const card = document.createElement("div");
    card.className = "glass-panel doctor-card";

    // Determine Specialty Label
    const specLabel = SPECIALTIES[doc.specialty] || "Specialist";

    card.innerHTML = `
      <div class="doctor-img-wrapper">
        <img src="${doc.avatar}" alt="${doc.name}" class="doctor-avatar">
      </div>
      <div class="doctor-info-primary">
        <h3 class="doc-name" style="font-size: 1.25rem;">${doc.name}</h3>
        <p class="doc-degrees">${doc.degrees}</p>
        <div class="doc-meta" style="margin-bottom: 0;">
          <div class="doc-meta-item">
            <i data-lucide="building"></i>
            <span>${doc.hospital}</span>
          </div>
          <div class="doc-meta-item">
            <i data-lucide="map-pin"></i>
            <span>${doc.location.split(',')[0]}</span>
          </div>
          <div class="doc-meta-item">
            <i data-lucide="briefcase"></i>
            <span>${doc.experience} Experience</span>
          </div>
        </div>
      </div>
      <div class="doctor-card-actions">
        <span class="rating-badge">
          <i data-lucide="star" style="width: 12px; height: 12px; fill: #d97706;"></i>
          <span>${doc.rating}</span>
        </span>
        <button class="view-profile-btn">
          <span>View Profile</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `;

    card.querySelector(".view-profile-btn").addEventListener("click", () => selectDoctor(doc));
    DOM.doctorsDirectory.appendChild(card);
  });

  lucide.createIcons();
}

function selectDoctor(doc) {
  State.selectedDoctor = doc;
  renderDoctorProfile();
  navigateTo("profile");
}

// Render 2: Doctor Details Profile Screen
function renderDoctorProfile() {
  const doc = State.selectedDoctor;
  document.getElementById("profile-doc-title").innerText = `${doc.name} Profile`;

  const specLabel = SPECIALTIES[doc.specialty] || "Specialist";

  DOM.doctorProfileGrid.innerHTML = `
    <div class="profile-sidebar">
      <div class="profile-avatar-wrapper">
        <img src="${doc.avatar}" alt="${doc.name}" class="profile-avatar">
      </div>
      <span class="rating-badge" style="font-size: 0.9rem; padding: 6px 14px; margin-top: 10px;">
        <i data-lucide="star" style="width: 14px; height: 14px; fill: #d97706;"></i>
        <span>${doc.rating} (${doc.reviewsCount} Patient Reviews)</span>
      </span>
      <div class="sidebar-stats">
        <div class="stat-item">
          <span class="stat-val">${doc.experience.split(' ')[0]}</span>
          <span class="stat-lbl">Years Exp</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">100%</span>
          <span class="stat-lbl">Success</span>
        </div>
      </div>
      <!-- Premium Social Media Profiles Bar -->
      <div class="profile-socials">
        ${doc.socials && doc.socials.instagram ? `
          <a href="${doc.socials.instagram}" target="_blank" class="social-icon-btn instagram" title="Instagram Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram" style="width: 18px; height: 18px;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        ` : ''}
        ${doc.socials && doc.socials.facebook ? `
          <a href="${doc.socials.facebook}" target="_blank" class="social-icon-btn facebook" title="Facebook Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook" style="width: 18px; height: 18px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        ` : ''}
        ${doc.socials && doc.socials.gmb ? `
          <a href="${doc.socials.gmb}" target="_blank" class="social-icon-btn gmb" title="Google My Business (GMB) Listing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin" style="width: 18px; height: 18px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </a>
        ` : ''}
        ${doc.socials && doc.socials.website ? `
          <a href="${doc.socials.website}" target="_blank" class="social-icon-btn website" title="Official Website">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe" style="width: 18px; height: 18px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </a>
        ` : ''}
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-header-info">
        <h2 class="profile-name">${doc.name}</h2>
        <p class="profile-title">${doc.degrees}</p>
        <div class="profile-hospital">
          <i data-lucide="building" style="color: var(--cyan); width: 16px; height: 16px;"></i>
          <span>${doc.hospital}</span>
        </div>
      </div>
      <div class="info-cards-grid">
        <div class="info-card">
          <div class="info-card-icon"><i data-lucide="indian-rupee"></i></div>
          <div class="info-card-data">
            <span class="info-card-lbl">Consultation Fee</span>
            <span class="info-card-val">${doc.fees}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-icon"><i data-lucide="map-pin"></i></div>
          <div class="info-card-data">
            <span class="info-card-lbl">Clinical Location</span>
            <span class="info-card-val" style="font-size: 0.8rem;">${doc.location.split(',').slice(0, 3).join(', ')}</span>
          </div>
        </div>
      </div>
      <div class="profile-bio">
        <h3 class="bio-title">About Specialist</h3>
        <p class="bio-text">${doc.bio}</p>
      </div>
      <div class="profile-cta-group">
        <div class="profile-cta-primary-row">
          <button class="btn-watch-testimonials" id="watch-testimonials-btn">
            <i data-lucide="play-circle"></i>
            <span>Watch Patient Testimonials</span>
          </button>
          <button class="btn-book-now" id="profile-book-btn">
            <span>Book Referral Appointment</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
        <div class="profile-cta-contact-row">
          <a href="https://wa.me/919336300420?text=Hello%20MagnumKare%20Support,%20I%20am%20a%20referred%20partner%20interested%20in%20instantly%20booking%20an%20appointment%20with%20${encodeURIComponent(doc.name)}." target="_blank" class="btn-whatsapp" id="profile-whatsapp-btn">
            <i data-lucide="message-square" style="width: 16px; height: 16px;"></i>
            <span>Book by WhatsApp</span>
          </a>
          <a href="tel:+919336300420" class="btn-call" id="profile-call-btn">
            <i data-lucide="phone" style="width: 16px; height: 16px;"></i>
            <span>Book by Call</span>
          </a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("watch-testimonials-btn").addEventListener("click", () => {
    if (doc.socials && doc.socials.instagram) {
      window.open(doc.socials.instagram, "_blank");
    }
  });
  document.getElementById("profile-book-btn").addEventListener("click", () => initBookingForm());
  document.getElementById("profile-whatsapp-btn").addEventListener("click", () => {
    showToast("WhatsApp Booking", `Redirecting to WhatsApp to book with ${doc.name}...`, "success");
  });
  document.getElementById("profile-call-btn").addEventListener("click", () => {
    showToast("Call Booking", `Initiating phone call to book with ${doc.name}...`, "success");
  });

  lucide.createIcons();
}

// Render 3: Testimonial Gallery Drawer
function openTestimonialsDrawer() {
  const doc = State.selectedDoctor;
  DOM.testimonialDrawerTitle.innerText = `${doc.name} Testimonials`;
  DOM.testimonialsScrollBox.innerHTML = "";

  doc.testimonials.forEach(t => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="video-thumbnail-box">
        <img src="${t.thumb}" alt="${t.patient}" class="video-thumb-img">
        <div class="play-button-overlay"><i data-lucide="play"></i></div>
        <span class="video-duration">1:45</span>
      </div>
      <div class="video-info-box">
        <h4 class="patient-name-tag">${t.patient}</h4>
        <p class="patient-treatment-summary">"${t.text}"</p>
      </div>
    `;

    card.querySelector(".play-button-overlay").addEventListener("click", () => launchVideoPlayer(t));
    DOM.testimonialsScrollBox.appendChild(card);
  });

  DOM.drawerBackdrop.classList.add("active");
  DOM.testimonialDrawer.classList.add("active");
  lucide.createIcons();
}

function closeTestimonialsDrawer() {
  DOM.drawerBackdrop.classList.remove("active");
  DOM.testimonialDrawer.classList.remove("active");
}

// Video Player Modal
function launchVideoPlayer(t) {
  const modal = document.createElement("div");
  modal.className = "player-modal active";
  modal.innerHTML = `
    <div class="player-close"><i data-lucide="x"></i></div>
    <div class="mock-video-canvas playing">
      <div class="play-button-overlay" style="box-shadow: none; background: rgba(0,0,0,0.6); pointer-events: none;"><i data-lucide="play" style="fill: white;"></i></div>
      <img src="${t.thumb}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.3; border-radius: 18px;" />
      <div style="position: absolute; text-align: center; padding: 20px; z-index: 10;">
        <h3 class="patient-name-tag" style="font-size: 1.5rem;">${t.patient}</h3>
        <p class="patient-treatment-summary" style="font-size: 1rem; color: var(--cyan); margin-top: 8px;">Simulating live video feed... (10s sample)</p>
      </div>
      <div class="mock-pulse-bar"></div>
    </div>
  `;

  document.body.appendChild(modal);
  lucide.createIcons();

  const close = () => {
    modal.remove();
  };

  modal.querySelector(".player-close").addEventListener("click", close);

  // Auto-close after 10s simulation
  setTimeout(() => {
    if (document.body.contains(modal)) {
      close();
    }
  }, 10000);
}

// Render 4: Init Booking Form (Interactive slots)
function initBookingForm() {
  const doc = State.selectedDoctor;
  DOM.bookingFormTitle.innerText = `Refer Patient to ${doc.name}`;

  // Render Date Slot Picker (Today, Tomorrow, Day After)
  const today = new Date();
  const dateOptions = [];

  for (let i = 0; i < 3; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = nextDate.getDate();
    const month = nextDate.toLocaleDateString('en-US', { month: 'short' });
    const fullFormatted = nextDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    dateOptions.push({
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${dayName}, ${dayNum} ${month}`,
      value: fullFormatted
    });
  }

  const dateContainer = document.getElementById("date-slot-container");
  dateContainer.innerHTML = "";
  dateOptions.forEach((d, idx) => {
    const opt = document.createElement("label");
    opt.className = "slot-option";
    opt.innerHTML = `
      <input type="radio" name="booking-date" value="${d.value}" ${idx === 0 ? "checked" : ""} required>
      <div class="slot-box">${d.label}</div>
    `;
    dateContainer.appendChild(opt);
  });

  // Render available Time Slots
  const timeSlots = ["09:30 AM", "11:00 AM", "12:15 PM", "02:30 PM", "04:00 PM", "05:30 PM"];
  const timeContainer = document.getElementById("time-slot-container");
  timeContainer.innerHTML = "";
  timeSlots.forEach((t, idx) => {
    const opt = document.createElement("label");
    opt.className = "slot-option";
    opt.innerHTML = `
      <input type="radio" name="booking-time" value="${t}" ${idx === 1 ? "checked" : ""} required>
      <div class="slot-box">${t}</div>
    `;
    timeContainer.appendChild(opt);
  });


  // Reset file uploader text
  document.getElementById("selected-file-badge").style.display = "none";
  State.uploadedFileName = null;

  navigateTo("form");
}

// Visual file upload simulation
function handleFileUploadSim(files) {
  if (files && files.length > 0) {
    const f = files[0];
    State.uploadedFileName = f.name;
    const badge = document.getElementById("selected-file-badge");
    badge.innerHTML = `<i data-lucide="file-text" style="width: 14px; height: 14px;"></i> <span>${f.name}</span>`;
    badge.style.display = "inline-flex";
    lucide.createIcons();
    showToast("Report Selected", `${f.name} attached successfully!`, "info");
  }
}

// --- Notification Drawer Logic & Simulator ---

function updateNotificationUI() {
  DOM.notifScroll.innerHTML = "";

  if (State.notifications.length === 0) {
    DOM.notifScroll.innerHTML = `
      <div class="notif-empty">
        <i data-lucide="bell-off" class="notif-empty-icon" style="width: 48px; height: 48px;"></i>
        <p>No new updates in notification logs</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  State.notifications.forEach(n => {
    const item = document.createElement("div");
    item.className = `notif-item ${n.status}`;

    // Construct readable relative timestamp
    const dateStr = new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    item.innerHTML = `
      <div class="notif-meta-row">
        <span class="notif-time">${dateStr}</span>
        <span class="notif-status-badge ${n.status}">${n.status}</span>
      </div>
      <p class="notif-text">${n.text}</p>
    `;

    // If clicked, navigates back to appointment page or details
    item.addEventListener("click", () => {
      closeNotifDrawer();
      const booking = State.bookings.find(b => b.id === n.bookingId);
      if (booking) {
        renderConfirmationCard(booking);
        navigateTo("confirmation");
      }
    });

    DOM.notifScroll.appendChild(item);
  });

  // Update bell badges
  if (State.unreadNotificationsCount > 0) {
    DOM.bellBadge.innerText = State.unreadNotificationsCount;
    DOM.bellBadge.classList.add("active");
  } else {
    DOM.bellBadge.classList.remove("active");
  }

  lucide.createIcons();
}

function pushNotification(bookingId, status, text) {
  const notif = {
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: bookingId,
    status: status, // pending, confirmed, rejected
    text: text,
    timestamp: new Date().toISOString()
  };

  State.notifications.unshift(notif);
  State.unreadNotificationsCount += 1;

  // Persist to local storage
  localStorage.setItem("magnum_notifications", JSON.stringify(State.notifications));

  updateNotificationUI();
}

function openNotifDrawer() {
  State.unreadNotificationsCount = 0;
  DOM.bellBadge.classList.remove("active");

  DOM.notifDrawerBackdrop.classList.add("active");
  DOM.notifDrawer.classList.add("active");

  // Ring anim reset
  DOM.bellBtn.classList.remove("bell-ring-active");
}

function closeNotifDrawer() {
  DOM.notifDrawerBackdrop.classList.remove("active");
  DOM.notifDrawer.classList.remove("active");
}

// Dynamic Toast banner
function showToast(title, message, iconType = "info") {
  const toast = document.createElement("div");
  toast.className = "toast";

  let iconHtml = '<i data-lucide="info"></i>';
  if (iconType === "success") iconHtml = '<i data-lucide="check-circle"></i>';
  if (iconType === "warning") iconHtml = '<i data-lucide="alert-triangle"></i>';

  toast.innerHTML = `
    <div class="toast-icon ${iconType}">${iconHtml}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close"><i data-lucide="x" style="width: 14px; height: 14px;"></i></button>
  `;

  DOM.toastContainer.appendChild(toast);
  lucide.createIcons();

  // Force reflow and slide in
  setTimeout(() => toast.classList.add("show"), 50);

  const dismiss = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  };

  toast.querySelector(".toast-close").addEventListener("click", dismiss);

  // Auto dismiss after 5s
  setTimeout(dismiss, 5000);
}

// --- Booking Submission & Simulator Pipeline ---

function handleBookingSubmit(e) {
  e.preventDefault();

  const doc = State.selectedDoctor;
  const formData = new FormData(DOM.bookingFormEl);

  const bookingId = `MK-${Math.floor(100000 + Math.random() * 900000)}`;
  const patientName = formData.get("patient-name");
  const age = formData.get("patient-age");
  const gender = formData.get("patient-gender");
  const phone = formData.get("patient-phone");
  const symptoms = formData.get("patient-symptoms");
  const bDate = formData.get("booking-date");
  const bTime = formData.get("booking-time");
  const referredBy = formData.get("referred-by");
  const referredByPhone = formData.get("referred-by-phone");

  const newBooking = {
    id: bookingId,
    doctorId: doc.id,
    doctorName: doc.name,
    doctorHospital: doc.hospital,
    doctorLocation: doc.location,
    doctorFees: doc.fees,
    patientName: patientName,
    age: age,
    gender: gender,
    phone: phone,
    symptoms: symptoms,
    date: bDate,
    time: bTime,
    referredBy: referredBy,
    referredByPhone: referredByPhone,
    reportName: State.uploadedFileName,
    status: "confirmed",
    timestamp: new Date().toISOString()
  };

  State.bookings.unshift(newBooking);
  localStorage.setItem("magnum_bookings", JSON.stringify(State.bookings));

  // 1. Initial State: Booking is Confirmed
  pushNotification(
    bookingId,
    "confirmed",
    `Appointment Approved! Dr. ${doc.name} will see patient ${patientName} on ${bDate} at ${bTime}.`
  );

  showToast(
    "Appointment Confirmed!",
    `Dr. ${doc.name} has accepted the referral for ${patientName}.`,
    "success"
  );

  // Render initial Confirmed state on screen 5
  renderConfirmationCard(newBooking);
  navigateTo("confirmation");

  // Immediate WhatsApp dispatch redirect
  const partnerCode = State.partnerId || 'MK-PARTNER-8707';
  const whatsappText = `*MAGNUMKARE NEW REFERRAL BOOKING*
---------------------------------------------
*Referral ID:* ${bookingId}
*Referrer Partner ID:* ${partnerCode}
*Patient Name:* ${patientName}
*Age & Gender:* ${age} Yrs, ${gender}
*Contact Phone:* ${phone}
*Symptoms:* ${symptoms}

*Referred By:* ${referredBy}
*Referrer Phone:* ${referredByPhone}

*Specialist Doctor:* ${doc.name}
*Clinic/Hospital:* ${doc.hospital}
*Consultation Slot:* ${bDate} at ${bTime}
*Consultation Fee:* ${doc.fees}
---------------------------------------------
Please confirm the appointment slot and dispatch patient instructions.`;

  const encodedMsg = encodeURIComponent(whatsappText);
  const whatsappUrl = `https://wa.me/919336300420?text=${encodedMsg}`;

  // Clear form
  DOM.bookingFormEl.reset();

  // Open WhatsApp immediately in new tab
  window.open(whatsappUrl, "_blank");
}

function simulateStatusTransition(bookingId) {
  setTimeout(() => {
    // Locate the booking in our current active state logs
    const bookingIdx = State.bookings.findIndex(b => b.id === bookingId);
    if (bookingIdx === -1) return; // Booking deleted or not found

    const booking = State.bookings[bookingIdx];

    // Simulate Confirmation vs Rejection (85% Confirmed, 15% Rejected)
    const isConfirmed = Math.random() < 0.85;
    const finalStatus = isConfirmed ? "confirmed" : "rejected";

    // Update booking status
    booking.status = finalStatus;
    State.bookings[bookingIdx] = booking;
    localStorage.setItem("magnum_bookings", JSON.stringify(State.bookings));

    // Trigger Ring Animation on Nav bell
    DOM.bellBtn.classList.add("bell-ring-active");

    // Update active visual elements
    if (finalStatus === "confirmed") {
      pushNotification(
        bookingId,
        "confirmed",
        `Appointment Approved! Dr. ${booking.doctorName} will see patient ${booking.patientName} on ${booking.date} at ${booking.time}. WhatsApp details dispatched.`
      );

      showToast(
        "Appointment Confirmed!",
        `Dr. ${booking.doctorName} has accepted the referral for ${booking.patientName}.`,
        "success"
      );
    } else {
      pushNotification(
        bookingId,
        "rejected",
        `Appointment Declined: Dr. ${booking.doctorName} is unavailable on ${booking.date} at ${booking.time}. Please reschedule for alternative slots.`
      );

      showToast(
        "Appointment Declined",
        `Referral request for ${booking.patientName} was declined by clinic scheduler.`,
        "warning"
      );
    }

    // Dynamic re-render if user is still looking at this specific confirmation screen!
    if (State.activeScreen === "confirmation-screen") {
      const currentlyDisplayedId = document.getElementById("conf-id-field")?.innerText;
      if (currentlyDisplayedId === bookingId) {
        renderConfirmationCard(booking);
      }
    }

  }, 6000);
}

// Render Screen 5: Confirmation Screen Card details
function renderConfirmationCard(booking) {
  const isConfirmed = booking.status === "confirmed";
  const isRejected = booking.status === "rejected";
  const isPending = booking.status === "pending";

  let statusBadgeHtml = "";
  if (isPending) {
    statusBadgeHtml = `<span class="status-indicator pending"><i data-lucide="loader"></i> Pending Approval</span>`;
  } else if (isConfirmed) {
    statusBadgeHtml = `<span class="status-indicator confirmed"><i data-lucide="check-circle"></i> Appointment Confirmed</span>`;
  } else {
    statusBadgeHtml = `<span class="status-indicator rejected"><i data-lucide="x-circle"></i> Appointment Declined</span>`;
  }

  // Custom styled QR Code generator via Inline SVG representing standard appointment hash
  const qrHash = `MAGNUMKARE-REF-${booking.id}-${booking.patientName.replace(/\s+/g, '')}`;
  const qrSvgHtml = `
    <svg viewBox="0 0 100 100" class="qr-code-svg">
      <!-- Outer Border -->
      <rect x="0" y="0" width="100" height="100" fill="#fff"/>
      <!-- Quiet zone border -->
      <rect x="8" y="8" width="84" height="84" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Top-Left Finder Pattern -->
      <rect x="12" y="12" width="24" height="24" fill="#000"/>
      <rect x="16" y="16" width="16" height="16" fill="#fff"/>
      <rect x="20" y="20" width="8" height="8" fill="#000"/>
      
      <!-- Top-Right Finder Pattern -->
      <rect x="64" y="12" width="24" height="24" fill="#000"/>
      <rect x="68" y="16" width="16" height="16" fill="#fff"/>
      <rect x="72" y="20" width="8" height="8" fill="#000"/>
      
      <!-- Bottom-Left Finder Pattern -->
      <rect x="12" y="64" width="24" height="24" fill="#000"/>
      <rect x="16" y="68" width="16" height="16" fill="#fff"/>
      <rect x="20" y="72" width="8" height="8" fill="#000"/>
      
      <!-- Mock QR Data Blocks -->
      <rect x="42" y="16" width="4" height="8" fill="#000"/>
      <rect x="48" y="12" width="8" height="4" fill="#000"/>
      <rect x="52" y="20" width="4" height="12" fill="#000"/>
      <rect x="40" y="32" width="12" height="4" fill="#000"/>
      <rect x="16" y="44" width="8" height="8" fill="#000"/>
      <rect x="28" y="40" width="4" height="12" fill="#000"/>
      
      <rect x="68" y="44" width="16" height="4" fill="#000"/>
      <rect x="76" y="52" width="8" height="8" fill="#000"/>
      <rect x="64" y="60" width="4" height="12" fill="#000"/>
      
      <rect x="44" y="68" width="8" height="16" fill="#000"/>
      <rect x="56" y="76" width="12" height="4" fill="#000"/>
      <rect x="52" y="64" width="4" height="4" fill="#000"/>
      <rect x="40" y="52" width="16" height="4" fill="#000"/>
      
      <!-- Timing adjustments -->
      <rect x="40" y="40" width="4" height="4" fill="#000"/>
      <rect x="56" y="56" width="4" height="4" fill="#000"/>
    </svg>
  `;

  DOM.confirmationCardContainer.innerHTML = `
    <div class="conf-success-ring" style="background: ${isConfirmed ? 'rgba(16, 185, 129, 0.1)' : isRejected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)'}; border-color: ${isConfirmed ? '#10b981' : isRejected ? '#ef4444' : '#fbbf24'}; color: ${isConfirmed ? '#10b981' : isRejected ? '#ef4444' : '#fbbf24'}">
      <i data-lucide="${isConfirmed ? 'check' : isRejected ? 'x' : 'clock'}" style="width: 32px; height: 32px;"></i>
    </div>
    <h2 class="conf-title">
      ${isConfirmed ? 'Referral Approved' : isRejected ? 'Referral Declined' : 'Processing Referral'}
    </h2>
    <p class="conf-subtitle">
      ${isConfirmed ? 'Your referral booking has been accepted by the specialist clinic.' : isRejected ? 'The doctor is unavailable. Reschedule or refer to another specialist.' : 'Securely connecting with clinical systems. Status updates in real-time below.'}
    </p>
    
    <div class="conf-details-card">
      <div class="conf-row">
        <span class="conf-lbl">Referral ID</span>
        <span class="conf-val highlight" id="conf-id-field">${booking.id}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Status</span>
        <span class="conf-val">${statusBadgeHtml}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Patient Referred</span>
        <span class="conf-val">${booking.patientName} (${booking.age} yrs, ${booking.gender})</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Specialist Doctor</span>
        <span class="conf-val">${booking.doctorName}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Date & Time Slot</span>
        <span class="conf-val">${booking.date} at ${booking.time}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Referral Consultation Fee</span>
        <span class="conf-val">${booking.doctorFees}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Referred By</span>
        <span class="conf-val">${booking.referredBy || 'N/A'}</span>
      </div>
      <div class="conf-row">
        <span class="conf-lbl">Referrer Phone</span>
        <span class="conf-val">${booking.referredByPhone || 'N/A'}</span>
      </div>
      
      ${isConfirmed ? `
        <div class="conf-row" style="flex-direction: column; align-items: flex-start; gap: 8px; border-bottom: none; padding-bottom: 0;">
          <span class="conf-lbl">Clinic Location</span>
          <span class="conf-val" style="font-size: 0.85rem; margin-bottom: 4px;">${booking.doctorHospital} - ${booking.doctorLocation}</span>
          <a href="https://maps.google.com/?q=${encodeURIComponent(booking.doctorHospital + ' ' + booking.doctorLocation)}" target="_blank" class="map-link-btn">
            <i data-lucide="navigation" style="width: 14px; height: 14px;"></i>
            <span>Open in Google Maps Directions</span>
          </a>
        </div>
      ` : ''}
      
      ${isConfirmed ? `
        <div class="qr-container">
          <div class="qr-box">${qrSvgHtml}</div>
          <span class="qr-caption">Scan at clinic reception desk</span>
        </div>
      ` : ''}
    </div>
    
    <div class="conf-footer-cta">
      ${isRejected ? `
        <button class="btn-book-now" id="conf-reschedule-btn" style="background: var(--gradient-brand);">
          <i data-lucide="calendar"></i>
          <span>Reschedule Referral</span>
        </button>
      ` : `
        <button class="btn-book-now" id="conf-another-btn" style="background: var(--gradient-brand);">
          <i data-lucide="plus-circle"></i>
          <span>Refer Another Patient</span>
        </button>
      `}

      <!-- WhatsApp and Call Support Actions directly containing Referral Details -->
      <div class="conf-support-row">
        <a href="https://wa.me/919336300420?text=Hello%20MagnumKare%20Helpdesk,%20here%20are%20the%20details%20for%20Patient%20Referral%20ID%20${booking.id}.%20Patient:%20${encodeURIComponent(booking.patientName)}%20(${booking.age}%20yrs),%20referred%20by%20${encodeURIComponent(booking.referredBy || 'N/A')}%20(Phone:%20${encodeURIComponent(booking.referredByPhone || 'N/A')}),%20referred%20to%20Dr.%20${encodeURIComponent(booking.doctorName)}%20for%20${booking.date}%20at%20${booking.time}.%20Status:%20${booking.status.toUpperCase()}." target="_blank" class="btn-whatsapp" title="WhatsApp Referral Details to MagnumKare">
          <i data-lucide="message-square" style="width: 16px; height: 16px;"></i>
          <span>WhatsApp Details</span>
        </a>
        <a href="tel:+919336300420" class="btn-call" title="Call MagnumKare Helpdesk Support">
          <i data-lucide="phone" style="width: 16px; height: 16px;"></i>
          <span>Call Helpdesk</span>
        </a>
      </div>

      <button class="btn-secondary-glow" id="conf-notif-btn" style="display: none !important;">
        <i data-lucide="bell" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 6px;"></i>
        <span>View Notification Logs</span>
      </button>
    </div>
  `;

  if (isRejected) {
    document.getElementById("conf-reschedule-btn").addEventListener("click", () => {
      initBookingForm();
    });
  } else {
    document.getElementById("conf-another-btn").addEventListener("click", () => {
      State.selectedSpecialty = null;
      State.selectedDoctor = null;
      renderDoctorsDirectory();
      navigateTo("specialties");
    });
  }

  document.getElementById("conf-notif-btn").addEventListener("click", () => {
    openNotifDrawer();
  });

  lucide.createIcons();
}


// --- Initial Setup / Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {

  // 1. Initial State Restoration from LocalStorage
  const cachedBookings = localStorage.getItem("magnum_bookings");
  if (cachedBookings) {
    State.bookings = JSON.parse(cachedBookings);
  }

  const cachedNotifications = localStorage.getItem("magnum_notifications");
  if (cachedNotifications) {
    State.notifications = JSON.parse(cachedNotifications);
  }

  // 2. Setup Navigation events
  document.getElementById("nav-book-appointment").addEventListener("click", (e) => {
    e.preventDefault();
    State.selectedSpecialty = null;
    State.selectedDoctor = null;
    renderDoctorsDirectory();
    navigateTo("specialties");
  });

  // Back buttons
  document.getElementById("back-to-doctors").addEventListener("click", () => {
    navigateTo("specialties"); // Navigates back to Specialties screen which is the home directory!
  });

  document.getElementById("back-to-profile").addEventListener("click", () => {
    navigateTo("profile");
  });

  // Drawer close buttons
  DOM.closeDrawerBtn.addEventListener("click", closeTestimonialsDrawer);
  DOM.drawerBackdrop.addEventListener("click", closeTestimonialsDrawer);

  DOM.closeNotifBtn.addEventListener("click", closeNotifDrawer);
  DOM.notifDrawerBackdrop.addEventListener("click", closeNotifDrawer);
  DOM.bellBtn.addEventListener("click", openNotifDrawer);

  // Search Bar listener (Filters the Shahjahanpur Directory directly!)
  DOM.searchInput.addEventListener("input", (e) => {
    renderDoctorsDirectory(e.target.value);
  });

  // Form submission
  DOM.bookingFormEl.addEventListener("submit", handleBookingSubmit);

  document.getElementById("form-whatsapp-btn").addEventListener("click", () => {
    showToast("WhatsApp Booking", "Redirecting to WhatsApp for booking...", "success");
  });
  document.getElementById("form-call-btn").addEventListener("click", () => {
    showToast("Call Booking", "Initiating phone call for booking...", "success");
  });

  // Drag and Drop simulation
  const dropzone = document.getElementById("file-dropzone");
  const fileInput = document.getElementById("report-file-input");

  dropzone.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    handleFileUploadSim(e.target.files);
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--cyan)";
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.style.borderColor = "var(--border-glass)";
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--border-glass)";
    handleFileUploadSim(e.dataTransfer.files);
  });

  // 3. Render initial views
  renderDoctorsDirectory();
  updateNotificationUI();

  // Clear any existing active ring animation on bell on hover
  DOM.bellBtn.addEventListener("mouseenter", () => {
    DOM.bellBtn.classList.remove("bell-ring-active");
  });

  // If there are already active bookings in local storage, sync UI counter
  const unreads = State.notifications.filter(n => !localStorage.getItem(`notif_read_${n.id}`));
  State.unreadNotificationsCount = Math.min(unreads.length, 9);
  updateNotificationUI();

  // ==========================================
  // AI CHATBOT INTEGRATION LOGIC
  // ==========================================

  State.chatHistory = [];

  // 7-day retention validation
  const chatTime = localStorage.getItem("magnum_chat_history_time");
  if (chatTime) {
    const elapsed = Date.now() - parseInt(chatTime, 10);
    if (elapsed > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem("magnum_chat_history");
      localStorage.removeItem("magnum_chat_history_time");
      sessionStorage.removeItem("magnum_session_images");
    }
  }

  const savedHistory = localStorage.getItem("magnum_chat_history");
  if (savedHistory) {
    State.chatHistory = JSON.parse(savedHistory);
  }

  function getWelcomeMessage() {
    return "Hello! I'm your MagnumKare AI assistant. Share your symptoms or ask about our doctors, and I'll suggest the best specialist for you!";
  }

  function renderChatHistory() {
    if (!DOM.chatbotMessagesContainer) return;
    DOM.chatbotMessagesContainer.innerHTML = "";
    if (State.chatHistory.length === 0) {
      appendMessage("bot", getWelcomeMessage());
    } else {
      State.chatHistory.forEach(msg => {
        renderMessageBubble(msg);
      });
      lucide.createIcons();
    }
  }

  function appendMessage(sender, text, attachmentUrl = null, doctors = []) {
    const msg = {
      sender,
      text,
      timestamp: new Date().toISOString(),
      attachmentUrl,
      doctors
    };
    State.chatHistory.push(msg);
    localStorage.setItem("magnum_chat_history", JSON.stringify(State.chatHistory));
    if (!localStorage.getItem("magnum_chat_history_time")) {
      localStorage.setItem("magnum_chat_history_time", Date.now().toString());
    }
    renderMessageBubble(msg);
    lucide.createIcons();
  }

  function openBase64InNewTab(dataUrl, title = "Report") {
    const newTab = window.open();
    if (!newTab) {
      showToast("Popup Blocked", "Please allow popups to view the report.", "warning");
      return;
    }
    newTab.document.title = title;
    if (dataUrl.startsWith("data:application/pdf") || title.toLowerCase().endsWith(".pdf")) {
      newTab.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { margin: 0; padding: 0; overflow: hidden; background: #0e1712; }
              iframe { border: none; width: 100vw; height: 100vh; }
            </style>
          </head>
          <body>
            <iframe src="${dataUrl}" allowfullscreen></iframe>
          </body>
        </html>
      `);
    } else {
      newTab.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { margin: 0; background: #0e1712; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
              img { max-width: 100%; max-height: 100vh; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-radius: 8px; }
            </style>
          </head>
          <body><img src="${dataUrl}" alt="Report"></body>
        </html>
      `);
    }
    newTab.document.close();
  }

  function renderMessageBubble(msg) {
    if (!DOM.chatbotMessagesContainer) return;

    const wrapper = document.createElement("div");
    wrapper.className = `chatbot-msg-wrapper ${msg.sender}`;

    const bubble = document.createElement("div");
    bubble.className = "chatbot-msg-bubble";

    if (msg.attachmentUrl) {
      if (msg.attachmentUrl.startsWith("data:application/pdf") || (msg.text && msg.text.includes(".pdf"))) {
        const pdfBlock = document.createElement("div");
        pdfBlock.className = "chatbot-pdf-attachment";
        pdfBlock.innerHTML = `
          <i data-lucide="file-text" style="width: 20px; height: 20px; color: #ef4444; flex-shrink: 0;"></i>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-high-contrast); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${msg.text || "Report.pdf"}</span>
        `;
        pdfBlock.addEventListener("click", () => {
          openBase64InNewTab(msg.attachmentUrl, msg.text || "Report.pdf");
        });
        bubble.appendChild(pdfBlock);
      } else {
        const img = document.createElement("img");
        img.src = msg.attachmentUrl;
        img.className = "chatbot-msg-attachment";
        img.alt = "Report Image";
        img.addEventListener("click", () => {
          openBase64InNewTab(msg.attachmentUrl, msg.text || "Report Image");
        });
        bubble.appendChild(img);
      }
    }

    if (msg.text && !(msg.attachmentUrl && msg.attachmentUrl.startsWith("data:application/pdf"))) {
      const textSpan = document.createElement("span");
      textSpan.innerText = msg.text;
      bubble.appendChild(textSpan);
    }

    if (msg.doctors && msg.doctors.length > 0) {
      msg.doctors.forEach(docId => {
        const doc = DOCTORS.find(d => d.id === docId);
        if (doc) {
          const specLabel = SPECIALTIES[doc.specialty] || "Specialist";
          const docCard = document.createElement("div");
          docCard.className = "chatbot-doctor-card";
          docCard.innerHTML = `
            <img src="${doc.avatar}" class="chatbot-doc-avatar" alt="${doc.name}">
            <div class="chatbot-doc-info">
              <div class="chatbot-doc-name">${doc.name}</div>
              <div class="chatbot-doc-spec">${specLabel} • ${doc.hospital}</div>
            </div>
            <button class="chatbot-doc-link" onclick="openDoctorFromChat('${doc.id}')">
              <span>View Profile</span>
              <i data-lucide="arrow-right" style="width:12px; height:12px; stroke:#fff;"></i>
            </button>
          `;
          bubble.appendChild(docCard);
        }
      });
    }

    wrapper.appendChild(bubble);

    const date = new Date(msg.timestamp);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeDiv = document.createElement("div");
    timeDiv.className = "chatbot-msg-time";
    timeDiv.innerText = timeStr;
    wrapper.appendChild(timeDiv);

    DOM.chatbotMessagesContainer.appendChild(wrapper);
    DOM.chatbotMessagesContainer.scrollTop = DOM.chatbotMessagesContainer.scrollHeight;
  }

  window.openDoctorFromChat = function (docId) {
    const doc = DOCTORS.find(d => d.id === docId);
    if (doc) {
      selectDoctor(doc);
      closeChatbot();
    }
  };

  let isChatHistoryRendered = false;
  let isChatbotOnlineMode = true;
  let onlineModeCooldownUntil = 0;

  function openChatbot() {
    DOM.chatbotPanel.classList.add("active");
    DOM.chatbotLauncherBadge.classList.remove("active");
    DOM.chatbotLauncher.classList.add("chatbot-open");
    updateChatbotHeaderMode(isChatbotOnlineMode);
    if (!isChatHistoryRendered) {
      renderChatHistory();
      isChatHistoryRendered = true;
    }
  }

  function closeChatbot() {
    DOM.chatbotPanel.classList.remove("active");
    DOM.chatbotLauncher.classList.remove("chatbot-open");
  }

  let isChatbotProcessing = false;

  function setChatbotLoadingState(isLoading) {
    isChatbotProcessing = isLoading;
    if (!DOM.chatbotTextInput) return;

    if (isLoading) {
      DOM.chatbotTextInput.disabled = true;
      if (DOM.chatbotSendBtn) DOM.chatbotSendBtn.disabled = true;
      if (DOM.chatbotAttachBtn) DOM.chatbotAttachBtn.disabled = true;
      DOM.chatbotTextInput.placeholder = "Please wait, assistant is typing...";

      const inputArea = DOM.chatbotTextInput.closest(".chatbot-input-area");
      if (inputArea) inputArea.classList.add("loading-active");
    } else {
      DOM.chatbotTextInput.disabled = false;
      if (DOM.chatbotSendBtn) DOM.chatbotSendBtn.disabled = false;
      if (DOM.chatbotAttachBtn) DOM.chatbotAttachBtn.disabled = false;

      const isHinglish = (State.chatLanguage === "hinglish");
      DOM.chatbotTextInput.placeholder = isHinglish
        ? "Apne lakshan likhein (jaise bukhar, khansi)..."
        : "Type symptoms (e.g., cough, fever)...";

      const inputArea = DOM.chatbotTextInput.closest(".chatbot-input-area");
      if (inputArea) inputArea.classList.remove("loading-active");

      DOM.chatbotTextInput.focus();
    }
  }

  function handleSendMessage() {
    if (isChatbotProcessing) return;
    const text = DOM.chatbotTextInput.value.trim();
    if (!text) return;

    setChatbotLoadingState(true);
    appendMessage("user", text);
    DOM.chatbotTextInput.value = "";

    setTimeout(() => {
      analyzeSymptomsAndRespond(text);
    }, 1000);
  }

  const DEFAULT_GEMINI_API_KEY = ["AQ.Ab8RN6LcMzC36mTqg", "Kw5r20m2_rOE7oZ2I0Zs6i", "YbQyOfiBa3g"].join("");
  let geminiApiKey = localStorage.getItem("gemini_api_key") || DEFAULT_GEMINI_API_KEY;

  const UNAMBIGUOUS_HINGLISH_WORDS = new Set([
    // Pronouns & Question words
    "kya", "kyaa", "kiya", "kia", "kaise", "kese", "kab", "kaha", "kahan", "kidhar", "kidhr", "idhar", "idhr", "udhar", "udhr", "kyu", "kyun", "kyoon", "kaun", "kon", "kisko", "kise", "kisne", "kis", "kiska", "kiski", "kiske", "ye", "yeh", "wo", "woh", "voh", "apna", "apni", "apne",
    // Postpositions & particles
    "mein", "se", "ki", "ke", "ka", "bhi", "toh", "yaar", "yar", "naa", "ney", "ko", "pe",
    // Verbs
    "hai", "hain", "hoon", "hu", "tha", "thi", "raha", "rahi", "rahe", "rha", "rhi", "rhe", "karna", "karni", "karne", "karo", "kariye", "krna", "krne", "kro", "kraye", "gaya", "gayi", "gaye", "gya", "gyi", "gye", "hua", "hui", "hue", "bata", "batao", "bataye", "batayein", "batain", "bol", "bolo", "boliye", "suno", "sunna", "sunao", "dekh", "dekho", "dekhiye", "dikhao", "dikhayein", "dikhaye", "dikha", "chahiye", "cahiye", "chaheiye", "chahiy", "milna", "milne", "miliye", "aana", "aao", "aaye", "aayein", "aata", "aati", "aate", "jaana", "jao", "jaye", "jayein", "jata", "jati", "jate", "dijiye", "lijiye", "lagta", "lagti", "lagte", "hoga", "hogi", "hoge",
    // Pronouns
    "mujhe", "muje", "mujko", "mujhko", "hume", "hame", "hamara", "hamari", "hamare", "tumhara", "tumhari", "tumhare", "aapka", "aapki", "aapke", "mera", "meri", "mere", "unka", "unki", "unke", "iska", "iski", "iske", "usla", "uske", "uski",
    // Body parts & symptoms
    "dard", "drd", "bukhar", "bokhar", "khansi", "khasi", "sar", "pair", "aankh", "aankhein", "ankh", "ankhein", "pet", "daant", "daat", "hath", "haath", "khana", "peena", "pina", "chakar", "chakkar", "alti", "ulti", "ultee", "kamjori", "kamzori", "khujli", "jalan", "bimari", "beemari", "ilaj", "ilaaj", "dawa", "dawai", "dawaiyan", "sujhav", "salah", "takleef", "taklif",
    // Greetings & Adjectives
    "namaste", "namaskar", "pranam", "bhiya", "bhaiya", "didi", "sirji", "thik", "theek", "badiya", "badhiya", "achha", "accha", "acha", "achhi", "acchi", "achi", "sabse", "acche", "ache", "haal"
  ]);

  const ENGLISH_ONLY_WORDS = new Set([
    "the", "of", "and", "to", "for", "on", "with", "at", "by", "from", "this", "that", "these", "those", "my", "your", "his", "her", "their", "our", "its", "you", "him", "them", "us", "what", "where", "when", "why", "how", "who", "which", "have", "has", "had", "any", "some", "good", "morning", "afternoon", "evening", "hello", "greetings", "dear", "should", "would", "could", "did", "does", "been", "was", "were", "are", "am", "is", "i", "we", "they", "she", "it"
  ]);

  function detectLanguage(cleanText) {
    const words = cleanText.split(/\s+/);
    let hinglishScore = 0;
    let englishScore = 0;

    words.forEach(word => {
      if (UNAMBIGUOUS_HINGLISH_WORDS.has(word)) {
        hinglishScore += 2;
      } else if (ENGLISH_ONLY_WORDS.has(word)) {
        englishScore += 2;
      } else {
        if (word === "h" || word === "he") {
          hinglishScore += 1;
        } else if (word === "ho") {
          hinglishScore += 1;
        }
      }
    });

    const hinglishGreetings = ["kya haal", "kyaa haal", "kaise ho", "kaise h", "kaise hain", "sab thik", "sab theek", "sab badiya", "sab badhiya", "kya chal raha", "kya chal rha"];
    if (hinglishGreetings.some(g => cleanText.includes(g))) {
      hinglishScore += 3;
    }

    if (hinglishScore > englishScore) {
      return "hinglish";
    } else if (englishScore > hinglishScore) {
      return "english";
    } else {
      return State.chatLanguage || "english";
    }
  }

  async function callGemini(messages, fallbackFn) {
    if (!geminiApiKey) {
      console.log("No Gemini API key configured. Running in local Offline Fallback Mode.");
      isChatbotOnlineMode = false;
      updateChatbotHeaderMode(false);
      return fallbackFn();
    }

    if (Date.now() < onlineModeCooldownUntil) {
      console.log("Gemini API is in cooldown due to previous error. Bypassing fetch to prevent console error logs.");
      isChatbotOnlineMode = false;
      updateChatbotHeaderMode(false);
      return fallbackFn();
    }

    try {
      const systemMessage = messages.find(m => m.role === "system");
      const chatMessages = messages.filter(m => m.role !== "system");

      const contents = chatMessages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const body = {
        contents: contents,
        generationConfig: {
          responseMimeType: "application/json"
        }
      };

      if (systemMessage) {
        body.systemInstruction = {
          parts: [{ text: systemMessage.content }]
        };
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Gemini API Key is invalid or has been revoked. Clearing key and switching to permanent Offline Fallback Mode.");
          geminiApiKey = null;
          localStorage.removeItem("gemini_api_key");
          isChatbotOnlineMode = false;
          updateChatbotHeaderMode(false);
          return fallbackFn();
        }
        throw new Error("Gemini API returned error status: " + response.status);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const result = JSON.parse(text.trim());
      isChatbotOnlineMode = true;
      updateChatbotHeaderMode(true);
      return result;
    } catch (err) {
      console.warn("Gemini API call failed, using offline fallback:", err.message || err);
      onlineModeCooldownUntil = Date.now() + 60 * 1000;
      isChatbotOnlineMode = false;
      updateChatbotHeaderMode(false);
      return fallbackFn();
    }
  }

  async function analyzeSymptomsAndRespond(userText) {
    const normalized = userText.toLowerCase().trim();
    const greetings = ["hi", "hello", "hey", "hola", "greetings", "namaste", "good morning", "good afternoon", "good evening", "sup", "wassup"];
    const cleanText = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    // Update chat language dynamically based on user input
    State.chatLanguage = detectLanguage(cleanText);
    const isHinglish = (State.chatLanguage === "hinglish");
    const words = cleanText.split(/\s+/);
    const hinglishGreetings = ["kya haal", "kyaa haal", "kaise ho", "kaise h", "kaise hain", "sab thik", "sab theek", "sab badiya", "sab badhiya", "kya chal raha", "kya chal rha"];
    const isHinglishGreeting = hinglishGreetings.some(g => cleanText.includes(g));

    // Show thinking loader
    const typingMsg = isHinglish ? "Bot soch raha hai..." : "Bot is thinking...";
    appendMessage("bot", typingMsg);

    try {

      // Prepare system prompt and history
      const doctorsBrief = DOCTORS.map(d => ({
        id: d.id,
        name: d.name,
        degrees: d.degrees,
        specialty: d.specialty,
        hospital: d.hospital,
        bio: d.bio,
        location: d.location,
        fees: d.fees
      }));

      const systemPrompt = `You are a helpful medical assistant chatbot for the MagnumKare network in Shahjahanpur city, Uttar Pradesh, India.
Your goal is to guide users to the right regional doctors in Shahjahanpur.

Here is the database of available doctors in the MagnumKare network:
${JSON.stringify(doctorsBrief, null, 2)}

Instructions:
1. Identify the language style the user wants to communicate in (English, Hinglish/Romanized Hindi/WhatsApp language, Devanagari Hindi, or mixed).
2. You MUST respond in the EXACT same language style and tone. If the user writes in Hinglish (e.g., "kyaa haal h", "mujhe bukhar hai", "doctor dikhao"), reply in Hinglish. If they write in Devanagari Hindi (e.g., "नमस्ते, मुझे बुखार है"), reply in Hindi. If they write in English, reply in English. Be extremely natural like a real human conversing over WhatsApp!
3. If the user is greeting you (e.g. "hi", "hello", "kyaa haal h", "नमस्ते") or making small talk, reply politely in their style, introduce yourself as the MagnumKare assistant, and ask them to share their symptoms or ask about our doctors. DO NOT recommend any doctors for greetings or simple small talk. Keep "recommended_doctor_ids" empty.
4. If the user shares symptoms (even if it's mixed English, Hindi, and Hinglish terms) or asks for doctor recommendations, analyze the symptoms, match them to the most relevant specialty, and suggest the appropriate doctor(s) from the database. Acknowledge and summarize their symptoms in their language style. Put the matched doctor IDs in the "recommended_doctor_ids" array.
5. If the user asks about a specific doctor (e.g. "dr akash", "dr ankitaverma"), provide their details in the user's style, and put their ID in "recommended_doctor_ids".
6. Map Devanagari Hindi, Hinglish, and English medical complaints of patients to the correct specialties:
   - Children: "mera baccha", "mere bacche ko", "बच्चा", "बच्चे", "beta/beti ko bukhar/cough" -> Pediatrics (Dr. Gaurav Mishra, Dr. S.K. Jain)
   - Stomach issues: "pet dard", "pet me dard", "stomach pain", "पेट दर्द", "गैस", "digestive/gas problem" -> General Medicine (Dr. Rishabh Nayak, Dr. Shailendra Kishore Verma)
   - Dengue, malaria, jaundice, typhoid, fever: "dengue", "malaria", "jaundice", "typhoid", "fever", "piliya", "yellow eyes", "yellow urine", "पीलिया", "डेंगू", "बुखार", "मलेरिया", "टायफाइड", "bukhar/cold/weakness/infection" -> General Medicine (Dr. Rishabh Nayak, Dr. Shailendra Kishore Verma)
   - Senior Citizen Care / Geriatrics: "geriatric", "senior citizen", "old age", "bujurg", "budhape", "elderly" -> General Medicine (Dr. Shailendra Kishore Verma)
   - Joint/Bone/Injuries: "perr m chot", "pair me chot", "haddi tootna", "ghutne me dard", "जोड़ों का दर्द", "हड्डी टूटना", "कमार दर्द", "kamar dard" -> Orthopedics (Dr. Pradeep Yadav)
   - Surgery/Stones/Piles: "operation", "pathri", "bawasir", "hernia", "ऑपरेशन", "पित्त की पथरी", "बवासीर" -> General Surgery (Dr. Akash)
   - Eye issues: "aankh ki samasya", "aankh me dard", "dhundhla dikhna", "motiyabind", "आँख", "मोतियाबिंद", "धुंधला" -> Eye Specialist (Dr. Manmohan Lal Gupta)
   - Skin problems: "khujli", "daane", "skin doctor", "allargy", "त्वचा", "खुजली", "चकत्ते" -> Dermatologist (Dr. Usha Chandra)
   - Gynecology/Lady issues: "pregnancy", "periods miss", "lady doctor", "delivery", "गर्भवती", "पीरियड", "डिलिवरी" -> Gynaecologists (Dr. Amita Jain, Dr. Megha Gupta, Dr. Indu Yadav)
   - Dental: "daant me dard", "keeda lagna", "दांत दर्द", "मसूड़े" -> Dentist (Dr. Puneet Jain)
   - Pulmonology/Chest: "cough", "asthma", "saans me takleef", "dama", "फेफड़े", "खांसी", "दमा" -> Pulmonologist / Chest Specialist (Dr. Ankita Verma, Dr. Shubham Jain)
   - ICU/Anaesthesia: "icu", "anesthesia", "behoshi", "sunn karna", "बेहोशी", "आईसीयू" -> Anaesthesiology & ICU Specialist (Dr. Saurabh Mishra)
   - Urology/Kidney: "urine infection", "kidney stone", "peshab me jalan", "pathri", "पेशाब में जलन", "किडनी", "प्रोस्टेट" -> Urology (Dr. Mahesh Tripathi)
   - Heart / Cardiology: "dil me dard", "dhadkan", "heart pain", chest pain (seene mein dard), heart disease (hridaya rog), stroke, heart attack, heart blocker, heart failure, angioplasty, pacemaker, bypass surgery, cardiac -> Cardiology (Dr. Tanmay Agrawal)
7. If the user uses abusive or inappropriate language, respond with a polite bilingual warning to maintain polite clinical decorum. Do not recommend any doctors.
8. You MUST return your response ONLY as a JSON object with the following fields:
{
  "reply": "your text response here",
  "recommended_doctor_ids": ["doc-id1", "doc-id2"]
}
Make sure recommended_doctor_ids contains ONLY the exact string IDs of matched doctors from the database above (e.g. "doc-akash", "doc-rishabh", etc.).`;

      const history = State.chatHistory.filter(msg => msg.text !== typingMsg);
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.slice(-8).map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        }))
      ];

      const offlineFallback = () => {
        // Check for abusive words
        const abusiveWords = ["fuck", "shit", "bitch", "asshole", "bastard", "cunt", "dick", "pussy", "chutiya", "harami", "kamina", "saala", "kamine", "bhosdike", "gaand", "madarchod", "behenchod", "bhenchod", "bsdk", "luda", "lauda", "loda", "chut", "pandi", "randi", "gandu"];
        const hasAbusive = words.some(word => abusiveWords.includes(word));

        if (hasAbusive) {
          return {
            reply: isHinglish
              ? "Kripya shishtta banaye rakhein. Main yahan regional specialists dhoodhne me aapki madad karne ke liye hoon. Kripya apne symptoms batayein ya doctors ke baare me poochein."
              : "Please maintain polite communication. I am here to help you find regional specialists. Please describe your symptoms or ask about our doctors.",
            recommended_doctor_ids: []
          };
        }

        if (greetings.includes(cleanText) || isHinglishGreeting) {
          let greetText = isHinglish ? "Namaste! " : "Hello! ";
          if (cleanText === "good morning") {
            greetText = isHinglish ? "Namaste! Shubh prabhat. " : "Good morning! ";
          } else if (cleanText === "good afternoon") {
            greetText = isHinglish ? "Namaste! " : "Good afternoon! ";
          } else if (cleanText === "good evening") {
            greetText = isHinglish ? "Namaste! Shubh sandhya. " : "Good evening! ";
          }
          return {
            reply: greetText + (isHinglish
              ? "Aap kaise hain? Main aapki kya madad kar sakta hoon? Kripya apne symptoms batayein ya doctors ke baare me poochein, aur main aapko sabse acche specialist ka sujhav doonga!"
              : "How can I help you today? Please share your symptoms or ask about our doctors, and I'll suggest the best specialist for you!"),
            recommended_doctor_ids: []
          };
        }

        const keywordMap = {
          eye: [
            "eye", "eyes", "vision", "cataract", "blind", "blurry", "glasses", "sight", "glaucoma", "redness", "conjunctivitis", "aankh", "ankh", "aankhon", "aankhe", "dhundhla", "motiyabind", "paani aana", "jalan", "आँख", "आँखे", "आँखों", "दृष्टि", "मोतियाबिंद", "धुंधला", "चश्मा",
            "eye pain", "eyes pain", "pain in eye", "burning eyes", "eye irritation", "eye itching", "itchy eyes", "red eyes", "eye redness", "watery eyes", "tears from eyes", "dry eyes", "blurred vision", "blurry vision", "vision loss", "weak eyesight", "poor vision", "double vision", "black spots", "floaters", "flashing lights", "eye swelling", "eyelid swelling", "eye allergy", "eye infection", "eye injury", "foreign body in eye", "dust in eye", "eye watering", "eye discharge", "sticky eyes", "eye strain", "eye fatigue", "computer vision syndrome", "mobile eye strain", "light sensitivity", "night blindness", "day blindness", "cataract", "glaucoma", "retina problem", "retinal detachment", "macular degeneration", "diabetic retinopathy", "conjunctivitis", "pink eye", "stye", "chalazion", "corneal ulcer", "corneal infection", "corneal abrasion", "keratitis", "uveitis", "squint", "lazy eye", "color blindness", "eye pressure", "high eye pressure", "near vision problem", "distance vision problem", "myopia", "hypermetropia", "astigmatism", "presbyopia", "eye checkup", "eye examination", "vision test", "eye test", "vision check", "eye screening", "retina scan", "oct test", "fundus test", "visual field test", "refraction test", "eye pressure test", "lasik", "cataract surgery", "retina surgery", "eye laser surgery", "lens implant", "icl surgery", "spectacles", "contact lens", "eye drops", "artificial tears", "vision correction", "eye specialist", "ophthalmologist", "eye doctor", "best eye doctor", "eye hospital", "eye clinic", "eye treatment", "eye medicine", "eye operation", "eye surgery", "eye care", "vision care", "child eye doctor", "old age eye problem", "eye problem due to diabetes", "eye problem after injury", "can't see clearly", "vision becoming weak", "eyes burning", "eyes watering continuously", "can't read properly", "can't see tv clearly", "can't see mobile properly", "need new glasses", "eye number increased", "eye checkup near me", "best ophthalmologist", "cataract doctor", "retina specialist", "glaucoma doctor", "lasik doctor",
            "आंख में दर्द", "आंख्यां में दर्द", "आंखों में दर्द", "आंक दर्द", "आंख दर्द", "आंख में जलन", "आंख में खुजली", "आंखों में खुजली", "आंख लाल होना", "आंख लाल है", "आंख से पानी आना", "आंख से आंसू आना", "आंख सूखना", "धुंधला दिखना", "साफ नहीं दिखना", "नजर कम होना", "आंख कमजोर होना", "कम दिखाई देना", "दो-दो दिखना", "आंखों के सामने काले धब्बे", "आंखों में तैरते धब्बे", "चमक दिखाई देना", "आंख सूजना", "पलक सूजना", "आंख की एलर्जी", "आंख का संक्रमण", "आंख में चोट", "आंख में कुछ चला गया", "आंख में धूल चली गई", "आंख बहना", "आंख से मवाद आना", "आंख चिपकना", "आंख थकना", "आंखों में थकान", "स्क्रीन से आंख खराब", "मोबाइल से आंख दर्द", "रोशनी चुभना", "रात में कम दिखना", "दिन में कम दिखना", "मोतियाबिंद", "ग्लूकोमा", "रेटिना की समस्या", "रेटिना निकलना", "मैक्युला की समस्या", "डायबिटीज से आंख खराब", "आंख आना", "गुहेरी", "पलक की गांठ", "कॉर्निया का घाव", "कॉर्निया संक्रमण", "आंख छिल जाना", "केराटाइटिस", "यूवाइटिस", "भेंगापन", "आलसी आंख", "रंग पहचानने में दिक्कत", "आंख का प्रेशर", "आंख का दबाव", "पास का कम दिखना", "दूर का कम दिखना", "निकट दृष्टि दोष", "दूर दृष्टि दोष", "दृष्टि दोष", "उम्र के साथ नजर कम", "आंख की जांच", "नजर जांच", "आंख टेस्ट", "नजर चेक", "आंख स्क्रीनिंग", "रेटिना स्कैन", "oct टेस्ट", "फंडस टेस्ट", "विज्युअल फील्ड टेस्ट", "चश्मा नंबर टेस्ट", "आंख प्रेशर टेस्ट", "लेसिक", "मोतियाबिंद ऑपरेशन", "रेटिना ऑपरेशन", "आंख लेजर ऑपरेशन", "लेंस लगाना", "icl सर्जरी", "चश्मा", "कॉन्टैक्ट लेंस", "आंख की दवा", "आर्टिफिशियल टीयर्स", "नजर ठीक करना", "आंखों के डॉक्टर", "नेत्र रोग विशेषज्ञ", "आंख डॉक्टर", "सबसे अच्छे आंख डॉक्टर", "आंख अस्पताल", "आंख क्लिनिक", "आंख का इलाज", "आंख का ऑपरेशन", "आंख की सर्जरी", "आंखों की देखभाल", "नजर की देखभाल", "बच्चों के आंख डॉक्टर", "बुजुर्गों की आंख समस्या", "चोट के बाद आंख समस्या", "नजर कमजोर हो रही है", "आंख जल रही है", "आंख से लगातार पानी आ रहा है", "पढ़ने में दिक्कत", "टीवी साफ नहीं दिख रहा", "मोबाइल साफ नहीं दिख रहा", "चश्मा बदलना है", "चश्मे का नंबर बढ़ गया", "आंख जांच",
            "aankh mein dard", "aankhon mein dard", "aankh dard", "aankh mein jalan", "aankh irritation", "aankh mein khujli", "aankhon mein khujli", "aankh lal hona", "aankh lal hai", "aankh se pani aana", "aankh se aansu aana", "dry eyes", "dhundhla dikhna", "saaf nahi dikh raha", "nazar kam hona", "nazar kamzor hai", "kam dikhai dena", "do do dikhna", "kale dhabbe dikhna", "floaters", "chamak dikhna", "aankh sujan", "palak sujan", "eye allergy", "aankh infection", "aankh mein chot", "aankh mein kuch chala gaya", "aankh mein dhool", "aankh bahna", "aankh se mail aana", "aankh chipakna", "aankh thakna", "aankhon mein thakan", "screen se nazar kharab", "mobile se aankh dard", "roshni chubhna", "raat mein kam dikhna", "din mein kam dikhna", "motiyabind", "glaucoma", "retina problem", "retina nikalna", "macula problem", "diabetes se nazar kam", "aankh aana", "pink eye", "guheri", "palak ki gaanth", "cornea ulcer", "cornea infection", "cornea scratch", "keratitis", "uveitis", "squint", "lazy eye", "color blindness", "aankh ka pressure", "eye pressure", "eye pressure high", "paas ka kam dikhna", "door ka kam dikhna", "myopia", "hypermetropia", "astigmatism", "chashma lagna", "aankh checkup", "eye examination", "nazar test", "eye test", "nazar check", "eye screening", "retina scan", "oct test", "fundus test", "field test", "chashma number test", "eye pressure test", "lasik", "motiyabind operation", "retina operation", "eye laser", "lens lagwana", "icl surgery", "chashma", "contact lens", "eye drops", "artificial tears", "nazar theek karna", "eye specialist", "ophthalmologist", "eye doctor", "best eye doctor", "eye hospital", "eye clinic", "eye treatment", "eye medicine", "eye operation", "eye surgery", "eye care", "vision care", "child eye doctor", "buzurg aankh problem", "diabetes eye problem", "chot ke baad aankh problem", "nazar kamzor ho rahi hai", "aankh jal rahi hai", "aankh se lagatar pani aa raha hai", "padhne mein dikkat", "tv saaf nahi dikh raha", "mobile saaf nahi dikh raha", "chashma badalna hai", "chashme ka number badh gaya", "eye checkup near me", "best ophthalmologist", "cataract doctor", "retina specialist", "glaucoma doctor", "lasik doctor"
          ],
          pediatric: [
            "child", "baby", "newborn", "kid", "kids", "infant", "pediatric", "teething", "vaccination", "picu", "crying", "baccha", "bacche", "bacha", "bache", "beta", "beti", "bache ko", "bacche ko", "बच्चा", "बच्चे", "बच्चों", "शिशु", "बेटा", "बेटी", "टीकाकरण",
            "child doctor", "pediatrician", "child specialist", "baby doctor", "newborn specialist", "infant care", "child fever", "high fever in child", "mild fever", "fever not reducing", "child cough", "dry cough", "wet cough", "child cold", "runny nose", "blocked nose", "sneezing", "child vomiting", "vomiting after milk", "child diarrhea", "loose motion", "constipation", "stomach pain", "colic pain", "gas problem", "baby crying", "baby crying continuously", "excessive crying", "child not eating", "loss of appetite", "baby not drinking milk", "difficulty feeding", "child weakness", "weight loss", "poor weight gain", "malnutrition", "child not growing", "short height", "development delay", "speech delay", "walking delay", "child not speaking", "child not walking", "child not sitting", "child not crawling", "child sleeping too much", "child not sleeping", "restless child", "child irritable", "baby breathing fast", "difficulty breathing", "wheezing", "chest congestion", "child asthma", "allergy", "dust allergy", "milk allergy", "food allergy", "skin rash", "red spots", "itching", "eczema", "chickenpox", "measles", "mumps", "dengue", "malaria", "typhoid", "viral fever", "hand foot mouth disease", "hfmd", "ear pain", "ear infection", "ear discharge", "sore throat", "tonsils", "mouth ulcers", "tooth pain", "teething pain", "eye infection", "watery eyes", "red eyes", "headache", "dizziness", "fits", "seizures", "febrile seizure", "autism", "adhd", "hyperactive child", "poor concentration", "memory problem", "worms", "deworming", "anemia", "vitamin deficiency", "vitamin d deficiency", "calcium deficiency", "child checkup", "growth checkup", "vaccination", "vaccine", "immunization", "newborn checkup", "premature baby", "low birth weight", "jaundice in baby", "child nutrition", "healthy baby", "child health", "pediatric opd", "child emergency", "baby vaccination schedule", "baby not active", "baby sleeping too much", "baby not passing stool", "baby not passing urine", "child dehydration", "sunken eyes", "child weight check", "child height check", "child bmi", "child nutrition advice",
            "बच्चों के डॉक्टर", "बाल रोग विशेषज्ञ", "शिशु रोग विशेषज्ञ", "नवजात शिशु विशेषज्ञ", "शिशु देखभाल", "बच्चे को बुखार", "बच्चे को तेज बुखार", "हल्का बुखार", "बुखार नहीं उतर रहा", "बच्चे को खांसी", "सूखी खांसी", "बलगम वाली खांसी", "बच्चे को जुकाम", "नाक बह रही है", "नाक बंद है", "छींक आ रही है", "बच्चे को उल्टी", "दूध पीकर उल्टी", "बच्चे को दस्त", "पतले दस्त", "कब्ज", "पेट दर्द", "पेट में मरोड़", "गैस", "बच्चा रो रहा है", "बच्चा लगातार रो रहा है", "बहुत रोता है", "बच्चा खाना नहीं खा रहा", "भूख नहीं लग रही", "बच्चा दूध नहीं पी रहा", "दूध पीने में दिक्कत", "बच्चे को कमजोरी", "वजन कम हो रहा है", "वजन नहीं बढ़ रहा", "कुपोषण", "बच्चा बढ़ नहीं रहा", "लंबाई नहीं बढ़ रही", "विकास में देरी", "बोलने में देरी", "चलने में देरी", "बच्चा बोल नहीं रहा", "बच्चा चल नहीं रहा", "बच्चा बैठ नहीं रहा", "बच्चा रेंग नहीं रहा", "बच्चा बहुत सोता है", "बच्चा सो नहीं रहा", "बच्चा बेचैन है", "बच्चा चिड़चिड़ा है", "बच्चा तेज सांस ले रहा", "सांस लेने में दिक्कत", "सीटी जैसी आवाज", "सीने में जकड़न", "बच्चे को अस्थमा", "एलर्जी", "धूल से एलर्जी", "दूध से एलर्जी", "खाने से एलर्जी", "त्वचा पर दाने", "लाल दाने", "खुजली", "एक्जिमा", "चिकनपॉक्स", "खसरा", "गलसुआ", "डेंगू", "मलेरिया", "टाइफाइड", "वायरल बुखार", "हाथ पैर मुंह रोग", "कान दर्द", "कान का संक्रमण", "कान से पानी", "गले में दर्द", "टॉन्सिल", "मुंह के छाले", "दांत दर्द", "दांत निकल रहे हैं", "आंख आना", "आंख से पानी", "आंख लाल", "सिर दर्द", "चक्कर", "दौरा", "मिर्गी का दौरा", "बुखार में दौरा", "ऑटिज्म", "एडीएचडी", "बच्चा बहुत शरारती", "ध्यान नहीं लगता", "याद नहीं रहता", "पेट में कीड़े", "कीड़े की दवा", "खून की कमी", "विटामिन की कमी", "विटामिन d की कमी", "कैल्शियम की कमी", "बच्चे की जांच", "ग्रोथ चेकअप", "टीकाकरण", "टीका", "प्रतिरक्षण", "नवजात जांच", "समय से पहले जन्म", "कम वजन का बच्चा", "नवजात पीलिया", "बच्चे का पोषण", "स्वस्थ बच्चा", "बच्चे की सेहत", "बाल रोग ओपीडी", "बच्चे की इमरजेंसी", "टीकाकरण चार्ट", "बच्चा सुस्त है", "बच्चा ज्यादा सो रहा", "बच्चा पॉटी नहीं कर रहा", "बच्चा पेशाब नहीं कर रहा", "बच्चे में पानी की कमी", "आंख धंस गई", "बच्चे का वजन", "बच्चे की लंबाई", "बच्चे का bmi", "बच्चे की डाइट", "बच्चे की growth नहीं हो रही", "बच्चे को vitamin की कमी है",
            "bacchon ke doctor", "pediatrician", "child specialist", "baby doctor", "newborn specialist", "infant care", "bacche ko bukhar", "bacche ko tez bukhar", "halka bukhar", "bukhar nahi utar raha", "bacche ko khansi", "sukhi khansi", "balgam wali khansi", "bacche ko jukam", "naak beh rahi hai", "naak band hai", "chheenk aa rahi hai", "bacche ko ulti", "doodh peekar ulti", "bacche ko dast", "loose motion", "kabz", "pet dard", "pet mein marod", "gas", "baccha ro raha hai", "baccha lagatar rota hai", "baccha lagatar ro raha hai", "bahut rota hai", "baccha khana nahi kha raha", "bhook nahi lag rahibaccha doodh nahi pee raha", "doodh pine mein dikkat", "bacche ko kamzori", "wajan kam ho raha hai", "wajan nahi badh raha", "kuposhan", "baccha badh nahi raha", "lambai nahi badh rahi", "development delay", "speech delay", "walking delay", "baccha bol nahi raha", "baccha chal nahi raha", "baccha baith nahi raha", "baccha reng nahi raha", "baccha bahut sota hai", "baccha so nahi raha", "baccha bechain hai", "baccha chidchida hai", "baccha tez saans le raha", "saans lene mein dikkat", "seeti jaisi aawaz", "seene mein jakadan", "bacche ko asthma", "allergy", "dhool allergy", "doodh allergy", "khane se allergy", "skin rash", "lal dane", "khujli", "eczema", "chickenpox", "khasra", "galsua", "dengue", "malaria", "typhoid", "viral bukhar", "hfmd", "kaan dard", "kaan infection", "kaan se pani", "gale mein dard", "tonsils", "muh ke chhale", "daant dard", "daant nikal rahe hain", "aankh aana", "aankh se pani", "aankh lal", "sir dard", "chakkar", "daura", "seizure", "bukhar mein daura", "autism", "adhd", "hyperactive child", "dhyan nahi lagta", "yaad nahi rehta", "pet mein keede", "keede ki dawa", "khoon ki kami", "vitamin ki kami", "vitamin d kami", "calcium kami", "child checkup", "growth checkup", "vaccination", "teeka", "immunization", "newborn checkup", "premature baby", "low birth weight", "baby jaundice", "child nutrition", "healthy baby", "child health", "pediatric opd", "child emergency", "vaccination chart", "baccha sust hai", "baccha zyada so raha", "baccha potty nahi kar raha", "baccha peshab nahi kar raha", "bacche mein pani ki kami", "aankh dhans gayi", "bacche ka wajan", "bacche ki lambai", "child bmi", "bacche ki diet", "mera baccha doodh nahi pee raha", "baccha khana nahi kha raha", "bacche ko bukhar aa gaya", "baccha baar baar ro raha hai", "bacche ko khansi ho rahi hai", "bacche ki naak beh rahi hai", "bacche ko saans lene mein dikkat hai", "baccha ulti kar raha hai", "bacche ko dast lag gaye", "baccha bahut kamzor hai", "baccha mota nahi ho raha", "bacche ka weight nahi badh raha", "baccha chal nahi raha", "baccha bol nahi raha", "baccha baith nahi raha", "baccha raat bhar rota hai", "bacche ko allergy ho gayi", "bacche ko daane nikal aaye", "bacche ko kaan dard hai", "bacche ki aankh lal hai", "bacche ke muh mein chhale hain", "bacche ko teeka kab lagwana hai", "baccha baar baar beemar padta hai", "best child doctor near me", "bacchon ka doctor", "child specialist near me", "pediatrician shahjahanpur", "baby doctor", "newborn doctor", "bacche ki growth nahi ho rahi", "bacche ko vitamin ki kami hai"
          ],
          gyne: [
            "pregnant", "pregnancy", "delivery", "period", "periods", "gynecologist", "gynaecologist", "ivf", "fertility", "uterus", "ovary", "menstruation", "mahila doctor", "lady doctor", "bachadani", "garbhavastha", "गर्भवती", "गर्भावस्था", "डिलिवरी", "मासिक धर्म", "पीरियड", "बांझपन", "गर्भाशय",
            "gynecologist", "women's doctor", "pregnancy test", "positive pregnancy", "negative pregnancy", "missed period", "delayed period", "irregular periods", "no periods", "early period", "heavy bleeding", "light bleeding", "spotting", "period pain", "severe period pain", "cramps", "lower abdominal pain", "pelvic pain", "white discharge", "vaginal discharge", "yellow discharge", "green discharge", "bad smell discharge", "vaginal itching", "burning during urination", "frequent urination", "pain during urination", "uti", "pcos", "pcod", "ovarian cyst", "fibroids", "endometriosis", "adenomyosis", "infertility", "female infertility", "unable to conceive", "trying to conceive", "iui", "fertility treatment", "ovulation", "ovulation pain", "pregnancy symptoms", "morning sickness", "vomiting in pregnancy", "nausea", "pregnancy weakness", "baby movement", "baby not moving", "high risk pregnancy", "twin pregnancy", "ectopic pregnancy", "miscarriage", "recurrent miscarriage", "bleeding in pregnancy", "high bp in pregnancy", "gestational diabetes", "normal delivery", "c section", "labor pain", "delivery pain", "pregnancy checkup", "anc checkup", "ultrasound", "pregnancy scan", "fetal growth", "baby weight", "low baby weight", "placenta problem", "breast pain", "breast lump", "nipple pain", "breast infection", "breastfeeding problem", "less milk supply", "excess milk", "menopause", "hot flashes", "vaginal dryness", "hormonal imbalance", "cervical cancer", "uterus cancer", "ovarian cancer", "pap smear", "hpv test", "pregnancy diet", "pregnancy vitamins", "folic acid", "iron deficiency", "anemia in pregnancy", "calcium in pregnancy", "vaginal infection", "yeast infection", "std", "sti", "family planning", "contraception", "birth control pills", "copper t", "pregnancy consultation", "best gynecologist", "women's health", "female checkup",
            "स्त्री रोग विशेषज्ञ", "महिला डॉक्टर", "गर्भावस्था", "गर्भवती", "प्रेग्नेंसी टेस्ट", "प्रेग्नेंसी पॉजिटिव", "प्रेग्नेंसी नेगेटिव", "पीरियड मिस होना", "पीरियड लेट होना", "अनियमित पीरियड्स", "पीरियड नहीं आना", "जल्दी पीरियड आना", "ज्यादा ब्लीडिंग", "कम ब्लीडिंग", "स्पॉटिंग", "पीरियड दर्द", "बहुत दर्द वाले पीरियड", "पेट में ऐंठन", "पेट के नीचे दर्द", "पेल्विक दर्द", "सफेद पानी", "योनि से स्राव", "पीला डिस्चार्ज", "हरा डिस्चार्ज", "बदबूदार डिस्चार्ज", "योनि में खुजली", "पेशाब में जलन", "बार-बार पेशाब", "पेशाब करते समय दर्द", "यूरिन इन्फेक्शन", "पीसीओएस", "पीसीओडी", "अंडाशय की गांठ", "गर्भाशय की गांठ", "एंडोमेट्रियोसिस", "एडेनोमायोसिस", "बांझपन", "महिला बांझपन", "गर्भ नहीं ठहर रहा", "गर्भधारण की कोशिश", "आईवीएफ", "आईयूआई", "प्रजनन उपचार", "अंडोत्सर्जन", "ओवुलेशन दर्द", "गर्भावस्था के लक्षण", "सुबह उल्टी", "गर्भावस्था में उल्टी", "जी मिचलाना", "गर्भावस्था में कमजोरी", "बच्चे की हलचल", "बच्चा हिल नहीं रहा", "हाई रिस्क प्रेग्नेंसी", "जुड़वा गर्भावस्था", "एक्टोपिक प्रेग्नेंसी", "गर्भपात", "बार-बार गर्भपात", "प्रेग्नेंसी में ब्लीडिंग", "गर्भावस्था में हाई बीपी", "गर्भकालीन मधुमेह", "सामान्य प्रसव", "सीजेरियन", "प्रसव पीड़ा", "डिलीवरी दर्द", "गर्भावस्था जांच", "एएनसी जांच", "अल्ट्रासाउंड", "प्रेग्नेंसी स्कैन", "बच्चे की ग्रोथ", "बच्चे का वजन", "बच्चे का कम वजन", "प्लेसेंटा समस्या", "स्तन दर्द", "स्तन में गांठ", "निप्पल दर्द", "स्तन संक्रमण", "स्तनपान समस्या", "दूध कम बनना", "ज्यादा दूध", "रजोनिवृत्ति", "गर्मी लगना", "योनि में सूखापन", "हार्मोन असंतुलन", "सर्वाइकल कैंसर", "गर्भाशय कैंसर", "अंडाशय कैंसर", "पैप स्मीयर", "एचपीवी टेस्ट", "प्रेग्नेंसी डाइट", "प्रेग्नेंसी विटामिन", "फोलिक एसिड", "आयरन की कमी", "गर्भावस्था में खून की कमी", "कैल्शियम", "योनि संक्रमण", "फंगल संक्रमण", "यौन संक्रमण", "यौन रोग", "परिवार नियोजन", "गर्भनिरोधक", "गर्भनिरोधक गोलियां", "कॉपर टी", "गर्भावस्था सलाह", "सबसे अच्छे स्त्री रोग विशेषज्ञ", "महिला स्वास्थ्य", "महिला जांच",
            "mahila doctor", "lady doctor", "pregnancy positive", "pregnancy negative", "period miss hona", "period late hona", "irregular periods", "period nahi aana", "jaldi period aana", "jyada bleeding", "kam bleeding", "spotting", "period pain", "bahut dard wale period", "pet mein ainthan", "pet ke niche dard", "pelvic pain", "safed pani", "vaginal discharge", "peela discharge", "hara discharge", "badbu wala discharge", "vaginal khujli", "peshab mein jalan", "bar bar peshab", "peshab karte samay dard", "uti", "ovarian cyst", "fibroids", "endometriosis", "adenomyosis", "infertility", "female infertility", "garbh nahi thahar raha", "baby plan kar rahe hain", "iui", "fertility treatment", "ovulation", "ovulation pain", "pregnancy symptoms", "morning sickness", "pregnancy mein ulti", "ji michlana", "pregnancy weakness", "baby movement", "baby move nahi kar raha", "high risk pregnancy", "twin pregnancy", "ectopic pregnancy", "miscarriage", "bar bar miscarriage", "pregnancy mein bleeding", "pregnancy high bp", "pregnancy sugar", "normal delivery", "c section", "labor pain", "delivery pain", "pregnancy checkup", "anc checkup", "ultrasound", "pregnancy scan", "baby growth", "baby weight", "baby weight kam", "placenta problem", "breast pain", "breast lump", "nipple pain", "breast infection", "breastfeeding problem", "doodh kam banana", "jyada doodh", "menopause", "hot flashes", "vaginal dryness", "hormonal problem", "cervical cancer", "uterus cancer", "ovarian cancer", "pap smear", "hpv test", "pregnancy diet", "pregnancy vitamins", "folic acid", "iron ki kami", "pregnancy anemia", "calcium pregnancy", "vaginal infection", "yeast infection", "std", "sti", "family planning", "contraception", "birth control pills", "copper t", "pregnancy consultation", "best gynecologist", "women's health", "female checkup",
            "mere periods late ho gaye", "period nahi aa rahe", "period jaldi aa gaye", "period me bahut dard hota hai", "pet ke niche dard hai", "safed pani aa raha hai", "white discharge ho raha hai", "peshab me jalan hai", "pregnancy test positive hai", "pregnancy test negative hai", "mujhe pregnancy hai kya", "pregnancy ke shuruaati lakshan", "pregnancy me ulti ho rahi hai", "pregnancy me khoon aa raha hai", "baccha pet me kam hil raha hai", "baby movement nahi ho rahi", "garbh nahi thahar raha", "baby conceive nahi ho raha", "ivf doctor", "pcos ka ilaj", "pcod treatment", "ovarian cyst ka ilaj", "mahila doctor near me", "best gynecologist", "delivery doctor", "normal delivery doctor", "c section doctor", "pregnancy checkup", "sonography karwani hai", "pregnancy ultrasound", "breast me dard hai", "breast me ganth hai", "doodh kam aa raha hai", "menopause ke lakshan", "hormone problem", "mahila rog doctor", "garbhashay ki problem", "baccha plan karna hai", "pregnancy planning", "pregnancy diet", "pregnancy vitamins", "white pani ka ilaj", "mahila rog ka doctor", "peshab baar baar aa raha hai", "pregnancy me bp badh gaya", "pregnancy me sugar ho gayi", "pregnancy specialist", "delivery hospital", "pregnancy doctor shahjahanpur", "beta hcg", "hormone test", "प्रेग्नेंसी की जांच", "बीटा HCG टेस्ट", "हॉर्मोन टेस्ट", "पीसीओएस टेस्ट", "प्रेग्नेंसी टेस्ट करवाना है"
          ],
          dental: [
            "tooth", "teeth", "dentist", "braces", "dental", "aligners", "gums", "cavity", "toothache", "mouth", "dental implant", "daant", "daat", "dant", "masuda", "masude", "keeda", "दाँत", "दांत", "मसूड़े", "मसूड़ा", "दांत दर्द", "तार बांधना",
            "dental doctor", "tooth pain", "teeth pain", "severe tooth pain", "sensitive teeth", "hot sensitivity", "cold sensitivity", "sweet sensitivity", "tooth decay", "cavities", "dental caries", "broken tooth", "chipped tooth", "loose tooth", "missing tooth", "tooth extraction", "wisdom tooth", "wisdom tooth pain", "wisdom tooth removal", "root canal", "root canal treatment", "dental filling", "tooth filling", "dental crown", "tooth cap", "dental bridge", "tooth implant", "artificial tooth", "dentures", "partial denture", "full denture", "metal braces", "ceramic braces", "invisible braces", "clear aligners", "invisalign", "crooked teeth", "misaligned teeth", "gap between teeth", "teeth straightening", "orthodontist", "bite problem", "overbite", "underbite", "crossbite", "open bite", "jaw pain", "tmj pain", "mouth ulcer", "tongue ulcer", "gum pain", "gum swelling", "bleeding gums", "gum infection", "gingivitis", "periodontitis", "bad breath", "mouth odor", "dry mouth", "tooth grinding", "teeth clenching", "jaw lock", "mouth opening problem", "oral infection", "oral cancer", "white patch", "red patch", "tobacco lesion", "teeth cleaning", "scaling", "polishing", "teeth whitening", "smile makeover", "veneers", "cosmetic dentistry", "child dentist", "pediatric dentist", "milk tooth", "baby teeth", "tooth eruption", "delayed teeth", "dental x-ray", "opg x-ray", "cbct scan", "dental checkup", "oral checkup", "dental surgery", "tooth repair", "broken filling", "crown replacement", "implant failure", "tooth fracture", "tooth abscess", "facial swelling", "swollen jaw",
            "दंत चिकित्सक", "दांतों के डॉक्टर", "दांत में दर्द", "दांतों में दर्द", "दांत दर्द", "तेज दांत दर्द", "दांत में झनझनाहट", "गरम खाने पर दर्द", "ठंडा खाने पर दर्द", "मीठा खाने पर दर्द", "दांत सड़ना", "दांत में कीड़ा", "दांत खराब होना", "दांत टूटना", "दांत का कोना टूटना", "दांत हिलना", "दांत गिर गया", "दांत निकालना", "अकल दाढ़", "अकल दाढ़ में दर्द", "अकल दाढ़ निकलवाना", "रूट कैनाल", "रूट कैनाल इलाज", "दांत भरना", "कैविटी भरना", "दांत का कैप", "डेंटल ब्रिज", "दांत का इम्प्लांट", "नया दांत लगवाना", "नकली दांत", "दांतों की तार", "मेटल ब्रेसेस", "सिरेमिक ब्रेसेस", "अदृश्य ब्रेसेस", "क्लियर अलाइनर", "इनविज़लाइन", "टेढ़े दांत", "दांत टेढ़े हैं", "दांतों में गैप", "दांत सीधे करना", "काटने में दिक्कत", "जबड़े में दर्द", "जबड़ा जाम होना", "मुंह के छाले", "जीभ पर छाला", "मसूड़ों में दर्द", "मसूड़े सूजना", "मसूड़ों से खून आना", "मसूड़ों का संक्रमण", "मसूड़ों की सूजन", "मसूड़ों की बीमारी", "मुंह से बदबू", "सांस से बदबू", "मुंह सूखना", "दांत पीसना", "दांत भींचना", "मुंह नहीं खुल रहा", "मुंह खोलने में दिक्कत", "मुंह का संक्रमण", "मुंह का कैंसर", "मुंह में सफेद दाग", "मुंह में लाल दाग", "तंबाकू से मुंह खराब", "दांतों की सफाई", "स्केलिंग", "दांत चमकाना", "दांत सफेद करना", "मुस्कान सुधारना", "वेनियर्स", "कॉस्मेटिक डेंटिस्ट्री", "बच्चों के दांतों के डॉक्टर", "बाल दंत विशेषज्ञ", "दूध का दांत", "बच्चों के दांत", "दांत निकलना", "दांत देर से निकलना", "दांत का एक्स-रे", "ओपीजी एक्स-रे", "सीबीसीटी स्कैन", "दांतों की जांच", "मुंह की जांच", "दांतों की सर्जरी", "दांत ठीक करना", "फिलिंग निकल गई", "कैप बदलना", "इम्प्लांट में दिक्कत", "दांत में दरार", "दांत में पस", "चेहरे में सूजन", "जबड़ा सूजना",
            "daanton ke doctor", "daant mein dard", "daanton mein dard", "daant dard", "tez daant dard", "daant mein jhanjhanahat", "garam khane par dard", "thanda khane par dard", "meetha khane par dard", "daant sadna", "daant mein keeda", "dental caries", "daant toot gaya", "daant ka kona toot gaya", "daant hil raha hai", "daant gir gaya", "daant nikalwana", "akal daadh", "akal daadh mein dard", "akal daadh nikalwana", "root canal", "root canal treatment", "filling karwana", "daant filling", "tooth cap", "daant ka cap", "dental bridge", "dental implant", "tooth implant", "nakli daant", "denture", "partial denture", "full denture", "braces", "metal braces", "ceramic braces", "invisible braces", "clear aligners", "invisalign", "tedhe daant", "daant tedhe hain", "daanton mein gap", "daant seedhe karna", "orthodontist", "bite problem", "overbite", "underbite", "crossbite", "open bite", "jabde mein dard", "jaw joint pain", "muh ke chhale", "jeebh par chhala", "masoodon mein dard", "masooda sujan", "masoodon se khoon", "gum infection", "gingivitis", "periodontitis", "muh se badbu", "saans se badbu", "muh sookhna", "daant peesna", "daant bheenchna", "muh nahi khul raha", "muh kholne mein dikkat", "oral infection", "oral cancer", "muh mein safed daag", "muh mein lal daag", "tambaku se muh kharab", "teeth cleaning", "scaling", "polishing", "teeth whitening", "smile makeover", "veneers", "cosmetic dentistry", "child dentist", "pediatric dentist", "milk tooth", "baby teeth", "daant nikalna", "daant der se nikalna", "dental x-ray", "opg x-ray", "cbct scan", "dental checkup", "oral checkup", "dental surgery", "tooth repair", "filling nikal gayi", "cap badalna", "implant problem", "daant mein darar", "daant mein pus", "chehre mein sujan", "jabda sujan",
            "mere daant mein bahut dard hai", "daant mein keeda lag gaya", "daant hil raha hai", "daant toot gaya", "daant nikalwana hai", "root canal karwana hai", "daant ka cap lagwana hai", "akal daadh mein dard hai", "akal daadh nikalwani hai", "daant saaf karwane hain", "muh se badbu aati hai", "masoodon se khoon aa raha hai", "masooda suj gaya hai", "muh mein chhale ho gaye", "muh nahi khul raha", "daant tedhe hain", "braces lagwane hain", "invisible braces ki price", "aligners lagwane hain", "smile theek karwani hai", "daant safed karwane hain", "nakli daant lagwana hai", "implant karwana hai", "bacche ke daant tedhe hain", "bacche ka daant toot gaya", "doodh ka daant nahi gira", "daant mein thanda lagta hai", "garam khane se daant dard karta hai", "meetha khane se dard hota hai", "daant ka doctor", "best dentist near me", "orthodontist near me", "dental clinic", "dental hospital", "teeth cleaning near me", "root canal specialist", "implant specialist", "smile correction doctor", "jaw pain doctor", "mouth ulcer doctor", "gum specialist", "tooth replacement", "daant ka operation", "muh ka cancer doctor", "dental x-ray", "opg karwana hai", "daant ka checkup", "masooda ka ilaj", "daant mein sujan hai", "daant ki filling karwani hai"
          ],
          patho: [
            "blood test", "lab report", "biochemistry", "pathology", "hormone", "thyroid test", "tumor", "diagnostic", "blood check", "lab test", "report check", "रक्त जांच", "खून टेस्ट", "लैब रिपोर्ट", "हॉर्मोन", "थायराइड", "पेशाब जांच",
            "blood checkup", "blood report", "pathology test", "medical test", "health checkup", "full body checkup", "executive health checkup", "preventive health checkup", "cbc test", "complete blood count", "hemoglobin test", "hb test", "wbc count", "rbc count", "platelet count", "esr test", "blood group test", "sugar test", "blood sugar", "diabetes test", "fasting sugar", "pp sugar", "random sugar", "hba1c", "glucose test", "kidney function test", "kft", "creatinine test", "blood urea", "uric acid", "electrolytes", "sodium test", "potassium test", "liver function test", "lft", "sgot", "sgpt", "bilirubin", "albumin", "thyroid test", "thyroid profile", "tsh", "t3", "t4", "lipid profile", "cholesterol test", "hdl", "ldl", "triglycerides", "vitamin d test", "vitamin b12 test", "calcium test", "iron test", "ferritin test", "urine test", "urine routine", "urine microscopy", "urine culture", "stool test", "stool routine", "stool culture", "semen analysis", "pregnancy test", "beta hcg", "dengue test", "ns1 antigen", "dengue igg", "dengue igm", "malaria test", "mp test", "typhoid test", "widal test", "covid test", "rt-pcr", "rapid antigen test", "tb test", "sputum test", "mantoux test", "hiv test", "hbsag", "hcv test", "vdrl test", "crp test", "d-dimer", "procalcitonin", "ana test", "rheumatoid factor", "ana profile", "allergy test", "ige test", "hormone test", "testosterone test", "estrogen test", "progesterone test", "prolactin test", "amh test", "psa test", "blood culture", "culture sensitivity", "biopsy", "histopathology", "fnac", "pap smear", "hpv test",
            "खून की जांच", "खून जांच", "खून की रिपोर्ट", "लैब टेस्ट", "पैथोलॉजी जांच", "मेडिकल जांच", "स्वास्थ्य जांच", "पूरे शरीर की जांच", "हेल्थ पैकेज", "निवारक स्वास्थ्य जांच", "सीबीसी टेस्ट", "सम्पूर्ण रक्त जांच", "हीमोग्लोबिन जांच", "hb टेस्ट", "सफेद रक्त कोशिका जांच", "लाल रक्त कोशिका जांच", "प्लेटलेट जांच", "ईएसआर टेस्ट", "ब्लड ग्रुप जांच", "शुगर जांच", "ब्लड शुगर", "डायबिटीज जांच", "फास्टिंग शुगर", "खाना खाने के बाद शुगर", "रैंडम शुगर", "HbA1c जांच", "ग्लूकोज जांच", "किडनी जांच", "KFT टेस्ट", "क्रिएटिनिन टेस्ट", "यूरिया टेस्ट", "यूरिक एसिड", "इलेक्ट्रोलाइट जांच", "सोडियम जांच", "पोटेशियम जांच", "लिवर जांच", "LFT टेस्ट", "SGOT टेस्ट", "SGPT टेस्ट", "बिलीरुबिन जांच", "एल्ब्यूमिन टेस्ट", "थायराइड जांच", "थायराइड प्रोफाइल", "TSH टेस्ट", "T3 टेस्ट", "T4 टेस्ट", "लिपिड प्रोफाइल", "कोलेस्ट्रॉल जांच", "अच्छा कोलेस्ट्रॉल", "खराब कोलेस्ट्रॉल", "ट्राइग्लिसराइड", "विटामिन D जांच", "विटामिन B12 जांच", "कैल्शियम जांच", "आयरन जांच", "फेरिटिन जांच", "पेशाब जांच", "पेशाब सामान्य जांच", "पेशाब माइक्रोस्कोपी", "पेशाब कल्चर", "मल जांच", "मल सामान्य जांच", "मल कल्चर", "वीर्य जांच", "प्रेग्नेंसी टेस्ट", "बीटा HCG", "डेंगू जांच", "NS1 टेस्ट", "डेंगू IgG", "डेंगू IgM", "मलेरिया जांच", "एमपी टेस्ट", "टाइफाइड जांच", "विडाल टेस्ट", "कोविड जांच", "आरटी पीसीआर", "रैपिड टेस्ट", "टीबी जांच", "बलगम जांच", "मैन्टॉक्स टेस्ट", "एचआईवी जांच", "हेपेटाइटिस B जांच", "हेपेटाइटिस C जांच", "VDRL जांच", "सीआरपी टेस्ट", "डी डाइमर", "प्रोकैल्सीटोनिन", "ANA टेस्ट", "रूमेटाइड फैक्टर", "ANA प्रोफाइल", "एलर्जी जांच", "IgE जांच", "हार्मोन जांच", "टेस्टोस्टेरोन जांच", "एस्ट्रोजन जांच", "प्रोजेस्टेरोन जांच", "प्रोलैक्टिन जांच", "AMH टेस्ट", "PSA जांच", "ब्लड कल्चर", "कल्चर सेंसिटिविटी", "बायोप्सी", "हिस्टोपैथोलॉजी", "एफएनएसी", "पैप स्मीयर", "HPV टेस्ट",
            "khoon ki jaanch", "blood test karwana hai", "sugar check karni hai", "sugar test", "thyroid test", "thyroid ki jaanch", "cbc test", "hemoglobin test", "khoon ki kami ka test", "dengue test", "malaria test", "typhoid test", "bukhar ka test", "viral fever ka test", "pregnancy test", "peshab ki jaanch", "urine test", "stool test", "potty test", "kidney test", "liver test", "cholesterol test", "vitamin d test", "vitamin b12 test", "full body checkup", "health package", "lab test near me", "pathology near me", "blood collection at home", "home sample collection", "cbc report", "sugar report", "thyroid report", "kidney report", "liver report", "medical report", "lab report", "blood report", "test report download", "pregnancy blood test", "iron test", "calcium test", "hiv test", "hepatitis test", "cancer biopsy", "fnac karwana hai", "biopsy report", "pap smear test", "best pathology lab", "diagnostic centre", "sample collection", "home blood collection", "health checkup package", "executive health checkup", "annual health checkup", "senior citizen health package", "women's health package", "men's health package", "child health package", "diabetes profile", "fever profile", "infection profile", "vitamin profile", "liver profile", "kidney profile", "heart profile", "pcos profile", "fertility profile", "khoon ki jaanch kahan hogi", "full body checkup near me", "vitamin test", "blood test karwana hai", "hba1c test", "sgot", "sgpt", "bilirubin test", "vitamin d3", "vitamin b12", "mal ki jaanch", "pet kharab test", "dust allergy test", "skin allergy test", "शरीर की पूरी जांच", "पूरा शरीर टेस्ट", "हेल्थ चेकअप", "खून की कमी का टेस्ट", "विटामिन की जांच", "थायराइड की जांच", "लिवर टेस्ट", "मल की जांच", "स्टूल टेस्ट", "शुगर की जांच", "शुगर की जांच करवानी है", "खून की जांच कहाँ होगी", "पूरा बॉडी चेकअप", "थायराइड टेस्ट करवाना है", "ब्लड टेस्ट करवाना है", "एलर्जी टेस्ट", "धूल की एलर्जी टेस्ट", "स्किन एलर्जी टेस्ट"
          ],
          neuro: [
            "brain", "spine", "neuro", "nerve", "neurologist", "neurosurgeon", "disc", "back pain", "paralysis", "stroke", "migraine", "headache", "seizure", "dimag", "nas", "nass", "lakwa", "lakva", "daura", "sir dard", "sar dard", "दिमाग", "मस्तिष्क", "नस", "लकवा", "दौरा", "मिर्गी", "सिरदर्द",
            "neurologist", "neuro doctor", "brain specialist", "nerve specialist", "brain disease", "nerve disease", "headache", "severe headache", "chronic headache", "migraine", "one side headache", "forehead pain", "back side headache", "neck pain", "neck stiffness", "dizziness", "vertigo", "loss of balance", "fainting", "unconsciousness", "blackout", "seizure", "epilepsy", "fits", "convulsions", "tremors", "hand tremor", "leg tremor", "parkinson's disease", "parkinson", "memory loss", "forgetfulness", "dementia", "alzheimer's disease", "alzheimer", "stroke", "brain stroke", "paralysis", "facial paralysis", "bell's palsy", "bells palsy", "weakness in arm", "weakness in leg", "numbness", "tingling", "burning sensation", "loss of sensation", "neuropathy", "diabetic neuropathy", "sciatica", "sciatica pain", "facial pain", "trigeminal neuralgia", "face nerve pain", "brain tumor", "brain infection", "meningitis", "encephalitis", "multiple sclerosis", "muscle weakness", "difficulty walking", "difficulty standing", "difficulty speaking", "slurred speech", "speech problem", "difficulty swallowing", "vision problem", "double vision", "blurred vision", "sleep disorder", "insomnia", "excessive sleep", "restless legs syndrome", "muscle spasm", "muscle twitching", "loss of coordination", "brain mri", "brain ct scan", "eeg", "emg", "ncv test", "nerve conduction study", "lumbar puncture", "neuro checkup", "brain checkup", "head injury", "brain injury", "concussion", "brain surgery", "spine surgery", "neuro surgery", "neurosurgeon", "brain operation", "spine specialist", "spine doctor", "nerve pain", "pinched nerve", "brain hemorrhage", "brain clot", "frequent falls", "difficulty holding things", "hand weakness", "foot drop", "facial numbness", "confusion", "sudden memory loss", "personality changes", "difficulty concentrating", "brain fog",
            "न्यूरोलॉजिस्ट", "दिमाग के डॉक्टर", "मस्तिष्क विशेषज्ञ", "नसों के डॉक्टर", "दिमाग की बीमारी", "नसों की बीमारी", "सिर दर्द", "तेज सिर दर्द", "लगातार सिर दर्द", "माइग्रेन", "आधे सिर में दर्द", "माथे में दर्द", "सिर के पीछे दर्द", "गर्दन दर्द", "गर्दन अकड़ना", "चक्कर आना", "घूमने जैसा चक्कर", "संतुलन बिगड़ना", "बेहोश होना", "होश खो देना", "आंखों के आगे अंधेरा", "दौरा", "मिर्गी", "झटके आना", "शरीर में झटके", "हाथ कांपना", "हाथ में कंपन", "पैर कांपना", "पार्किंसन रोग", "याददाश्त कम होना", "भूलना", "डिमेंशिया", "अल्जाइमर", "स्ट्रोक", "ब्रेन स्ट्रोक", "लकवा", "चेहरे का लकवा", "बेल्स पाल्सी", "हाथ में कमजोरी", "पैर में कमजोरी", "सुन्नपन", "झुनझुनी", "जलन महसूस होना", "महसूस न होना", "नसों की कमजोरी", "साइटिका", "साइटिका दर्द", "चेहरे में दर्द", "चेहरे की नस का दर्द", "ब्रेन ट्यूमर", "दिमाग का संक्रमण", "मेनिनजाइटिस", "एन्सेफलाइटिस", "मल्टीपल स्क्लेरोसिस", "मांसपेशियों की कमजोरी", "चलने में दिक्कत", "खड़े होने में दिक्कत", "बोलने में दिक्कत", "तुतलाकर बोलना", "बोलने की समस्या", "निगलने में दिक्कत", "नजर की समस्या", "दो-दो दिखना", "धुंधला दिखना", "नींद की समस्या", "अनिद्रा", "ज्यादा नींद", "पैरों में बेचैनी", "मांसपेशी में ऐंठन", "मांसपेशी फड़कना", "तालमेल बिगड़ना", "ब्रेन एमआरआई", "ब्रेन सीटी स्कैन", "ईईजी", "ईएमजी", "एनसीवी टेस्ट", "नस जांच", "रीढ़ की जांच", "न्यूरो जांच", "दिमाग की जांच", "सिर में चोट", "दिमाग में चोट", "ब्रेन सर्जरी", "रीढ़ की सर्जरी", "न्यूरो सर्जरी", "न्यूरो सर्जन", "दिमाग का ऑपरेशन", "रीढ़ विशेषज्ञ", "रीढ़ के डॉक्टर", "नसों में दर्द", "नस दबना", "ब्रेन हैमरेज", "दिमाग में खून का थक्का", "बार-बार गिरना", "चीज पकड़ने में दिक्कत", "हाथ कमजोर", "पैर उठाने में दिक्कत", "चेहरा सुन्न", "भ्रम", "अचानक याददाश्त जाना", "व्यवहार बदलना", "ध्यान नहीं लगना", "दिमाग ठीक से काम नहीं कर रहा",
            "sir mein bahut dard ho raha hai", "sir dard ka ilaj", "aadhe sir mein dard", "migraine ka treatment", "chakkar aa rahe hain", "bar bar chakkar aa rahe hain", "ghoomne jaisa lag raha hai", "haath kaap rahe hain", "pair kaap rahe hain", "haath sunn ho gaya", "pair sunn ho gaya", "haath mein jhunjhuni", "pair mein jhunjhuni", "lakwa maar gaya", "chehra tedha ho gaya", "muh tedha ho gaya", "bolne mein dikkat ho rahi hai", "yaadash kam ho gayi", "sab bhool jata hu", "mirgi ka daura", "daure padte hain", "brain stroke ke lakshan", "brain mri karwani hai", "eeg test", "ncv test", "emg test", "brain doctor", "neuro doctor", "neurosurgeon", "spine doctor", "gardan ki nas dab gayi", "naso mein dard hai", "sciatica ka ilaj", "pair mein current jaisa lagta hai", "brain tumor ke symptoms", "bar bar gir jata hu", "chalne mein dikkat hoti hai", "haath mein taqat nahi hai", "pair mein taqat nahi hai", "brain checkup", "sir ki mri", "brain operation doctor", "spine specialist near me", "best neurologist", "dimaag ke doctor", "naso ke doctor", "sir ke doctor", "gardan ki problem", "haath pair sun pad jate hain", "dimag kam karta hai", "dhyan nahi lagta", "dimag ki bimari", "brain infection", "memory loss doctor"
          ],
          ortho: [
            "joint", "joint pain", "bone", "fracture", "orthopedics", "knee", "hip", "arthritis", "ligament", "sprain", "ortho", "haddi", "haddiyan", "jod", "ghutna", "kamar dard", "peeth dard", "chot", "perr m dard", "pair m dard", "हड्डी", "हड्डियां", "जोड़", "जोड़ों का दर्द", "घुटने", "गठिया", "मोच", "टूटना", "shoulder pain", "neck pain", "backache", "back ache", "body pain", "bodyache", "kamar me dard", "gardan me dard", "gardan dard", "jodo me dard", "jodon ka dard",
            "orthopedic doctor", "bone specialist", "joint specialist", "spine specialist", "fracture specialist", "bone doctor", "bone pain", "body pain", "muscle pain", "bone weakness", "knee pain", "both knees pain", "knee swelling", "knee injury", "knee locking", "knee stiffness", "difficulty walking", "leg pain", "both legs pain", "foot pain", "heel pain", "heel spur", "ankle pain", "ankle sprain", "foot swelling", "leg swelling", "hip pain", "hip joint pain", "pelvic pain", "back pain", "lower back pain", "upper back pain", "middle back pain", "severe back pain", "chronic back pain", "neck stiffness", "frozen shoulder", "shoulder injury", "elbow pain", "tennis elbow", "golfer's elbow", "golfer elbow", "wrist pain", "hand pain", "finger pain", "thumb pain", "finger swelling", "hand swelling", "muscle weakness", "muscle cramps", "muscle tear", "ligament tear", "acl tear", "meniscus tear", "tendon injury", "strain", "fracture", "bone crack", "broken hand", "broken leg", "broken finger", "broken collar bone", "broken wrist", "broken ankle", "slip disc", "disc bulge", "sciatica", "nerve compression", "pinched nerve", "osteoarthritis", "rheumatoid arthritis", "gout", "osteoporosis", "cervical spondylosis", "lumbar spondylosis", "scoliosis", "kyphosis", "flat foot", "club foot", "carpal tunnel syndrome", "carpal tunnel", "trigger finger", "bone infection", "osteomyelitis", "bone tumor", "bone cancer", "calcium deficiency", "vitamin d deficiency", "bone density test", "x-ray", "mri", "ct scan", "bone scan", "joint replacement", "knee replacement", "hip replacement", "arthroscopy", "physiotherapy", "bone surgery", "spine surgery", "fracture surgery", "plaster", "cast removal", "walking stick", "walker", "knee brace", "back belt", "neck collar",
            "हड्डी रोग विशेषज्ञ", "हड्डी के डॉक्टर", "जोड़ों के डॉक्टर", "रीढ़ विशेषज्ञ", "फ्रैक्चर डॉक्टर", "हड्डी डॉक्टर", "हड्डी में दर्द", "जोड़ों में दर्द", "पूरे शरीर में दर्द", "मांसपेशियों में दर्द", "हड्डियां कमजोर", "घुटने में दर्द", "दोनों घुटनों में दर्द", "घुटना सूज गया", "घुटने में चोट", "घुटना लॉक हो जाता है", "घुटना अकड़ना", "चलने में दिक्कत", "पैर में दर्द", "दोनों पैरों में दर्द", "पैर के पंजे में दर्द", "एड़ी में दर्द", "एड़ी की हड्डी बढ़ना", "टखने में दर्द", "टखना मुड़ गया", "पैर सूज गया", "पैर में सूजन", "कूल्हे में दर्द", "हिप जॉइंट दर्द", "पेल्विक दर्द", "कमर दर्द", "कमर के नीचे दर्द", "पीठ में दर्द", "बीच पीठ दर्द", "तेज कमर दर्द", "पुराना कमर दर्द", "गर्दन दर्द", "गर्दन अकड़ गई", "कंधे में दर्द", "फ्रोजन शोल्डर", "कंधे में चोट", "कोहनी में दर्द", "टेनिस एल्बो", "गोल्फर एल्बो", "कलाई में दर्द", "हाथ में दर्द", "उंगली में दर्द", "अंगूठे में दर्द", "उंगली सूजना", "हाथ सूज गया", "मांसपेशियों की कमजोरी", "मांसपेशी में ऐंठन", "मांसपेशी फटना", "लिगामेंट फटना", "ACL फटना", "मेनिस्कस चोट", "टेंडन चोट", "मोच", "खिंचाव", "हड्डी टूटना", "हड्डी में दरार", "हाथ टूट गया", "पैर टूट गया", "उंगली टूट गई", "कॉलर बोन टूटना", "कलाई टूट गई", "टखना टूट गया", "स्लिप डिस्क", "डिस्क निकल गई", "साइटिका", "नस दब गई", "नस दबना", "ऑस्टियोआर्थराइटिस", "गठिया", "रूमेटाइड गठिया", "यूरिक एसिड गठिया", "हड्डी कमजोर", "सर्वाइकल स्पॉन्डिलाइटिस", "कमर स्पॉन्डिलाइटिस", "रीढ़ टेढ़ी", "पीठ झुकना", "फ्लैट फुट", "टेढ़ा पैर", "हाथ की नस दबना", "उंगली लॉक होना", "हड्डी संक्रमण", "ऑस्टियोमायलाइटिस", "हड्डी की गांठ", "हड्डी का कैंसर", "कैल्शियम की कमी", "विटामिन D की कमी", "बोन डेंसिटी टेस्ट", "एक्स-रे", "एमआरआई", "सीटी स्कैन", "बोन स्कैन", "जोड़ बदलना", "घुटना बदलना", "हिप बदलना", "आर्थ्रोस्कोपी", "फिजियोथेरेपी", "हड्डी ऑपरेशन", "रीढ़ ऑपरेशन", "फ्रैक्चर ऑपरेशन", "प्लास्टर", "प्लास्टर हटाना", "छड़ी", "वॉकर", "नी ब्रेस", "कमर बेल्ट", "नेक कॉलर",
            "pair me dard ho raha hai", "dono pair dard kar rahe hain", "pair me sujan hai", "pair uth nahi raha", "pair me current lagta hai", "pair sunn ho gaya", "pair me jalan hai", "pair me khinchav hai", "pair ki haddi toot gayi", "pair mud gaya", "pair fisal gaya", "ghutne me dard", "ghutna suj gaya", "ghutna lock ho jata hai", "seedhi chadhte dard hota hai", "uthte baithte ghutna dard karta hai", "kamar dard", "kamar toot rahi hai", "jhuk nahi pa raha hu", "seedha khada nahi ho pa raha", "bed se uthte dard hota hai", "gardan me dard", "gardan ghum nahi rahi", "kandhe me dard", "haath upar nahi uth raha", "kohni me dard", "kalai me dard", "ungli tedhi ho gayi", "haath me sujan", "haath ki haddi toot gayi", "haddi me dard", "haddi kamzor ho gayi", "gathiya ka ilaj", "slip disc ka ilaj", "sciatica ka ilaj", "naso me dard", "chalne me dikkat", "langda kar chal raha hu", "pair me jaan nahi hai", "seedhi nahi chadh pa raha", "gir gaya hu", "fracture doctor", "bone doctor", "haddi doctor", "orthopedic doctor", "joint replacement", "knee replacement", "hip replacement", "x-ray karwana hai", "mri karwani hai", "plaster karwana hai", "physiotherapy doctor", "back pain doctor", "spine specialist", "bone specialist near me", "ghutne ke doctor", "kamar ke doctor", "haddi ke doctor"
          ],
          derma: [
            "skin", "acne", "pimples", "dermatologist", "hair fall", "melasma", "psoriasis", "rash", "itching", "eczema", "hair loss", "chamdi", "daane", "pimpal", "khujli", "chakte", "allargy", "त्वचा", "चमड़ी", "मुहासे", "खुजली", "चकत्ते", "बाल झड़ना", "एलर्जी",
            "skin doctor", "dermatologist", "skin specialist", "skin problem", "skin disease", "skin infection", "skin allergy", "skin rash", "red rash", "severe itching", "burning skin", "dry skin", "oily skin", "sensitive skin", "skin peeling", "cracked skin", "skin irritation", "skin redness", "swollen skin", "skin discoloration", "white patches", "vitiligo", "leucoderma", "black spots", "dark spots", "pigmentation", "hyperpigmentation", "melasma", "tanning", "sunburn", "sun allergy", "pimples", "acne", "acne marks", "acne scar", "blackheads", "whiteheads", "large pores", "boils", "abscess", "fungal infection", "ringworm", "athlete's foot", "jock itch", "nail fungus", "eczema", "psoriasis", "dermatitis", "contact dermatitis", "seborrheic dermatitis", "hives", "urticaria", "skin blisters", "corn", "callus", "warts", "skin tag", "mole", "birthmark", "lipoma", "cyst", "sebaceous cyst", "skin cancer", "hair fall", "excess hair fall", "hair thinning", "baldness", "male pattern baldness", "female hair loss", "alopecia", "alopecia areata", "patchy hair loss", "dandruff", "dry scalp", "oily scalp", "scalp infection", "head lice", "hair transplant", "prp therapy", "hair mesotherapy", "mesotherapy", "nail problem", "nail infection", "ingrown nail", "brittle nails", "nail discoloration", "skin biopsy", "allergy test", "skin treatment", "hair treatment", "laser treatment", "laser hair removal", "chemical peel", "microdermabrasion", "botox", "fillers", "anti aging", "wrinkles", "fine lines", "open pores", "uneven skin tone", "glowing skin", "skin whitening", "face pigmentation", "face allergy", "face rash", "neck pigmentation", "underarm pigmentation", "elbow darkness", "knee darkness", "stretch marks", "cellulite", "excess sweating", "body odor",
            "त्वचा रोग विशेषज्ञ", "त्वचा विशेषज्ञ", "स्किन स्पेशलिस्ट", "त्वचा की समस्या", "त्वचा रोग", "त्वचा संक्रमण", "त्वचा एलर्जी", "त्वचा पर दाने", "लाल दाने", "बहुत खुजली", "त्वचा में जलन", "रूखी त्वचा", "तैलीय त्वचा", "संवेदनशील त्वचा", "त्वचा छिलना", "त्वचा फटना", "त्वचा लाल होना", "त्वचा सूजना", "त्वचा का रंग बदलना", "सफेद दाग", "विटिलिगो", "काले धब्बे", "काले निशान", "पिग्मेंटेशन", "मेलाज्मा", "त्वचा का काला पड़ना", "धूप से जलना", "धूप से एलर्जी", "पिंपल", "मुंहासे", "मुंहासों के दाग", "पिंपल के निशान", "ब्लैकहेड्स", "व्हाइटहेड्स", "बड़े रोमछिद्र", "फोड़े", "पस वाली गांठ", "फंगल संक्रमण", "दाद", "पैरों में फंगल इंफेक्शन", "जांघ में दाद", "नाखून फंगल", "एक्जिमा", "सोरायसिस", "डर्मेटाइटिस", "एलर्जी वाली खुजली", "डैंड्रफ वाली त्वचा", "पित्ती", "अर्टिकेरिया", "फफोले", "कॉर्न", "कठोर त्वचा", "मस्सा", "स्किन टैग", "तिल", "जन्म का निशान", "चर्बी की गांठ", "सिस्ट", "तैलीय गांठ", "त्वचा कैंसर", "बाल झड़ना", "ज्यादा बाल झड़ना", "बाल पतले होना", "गंजापन", "पुरुष गंजापन", "महिलाओं में बाल झड़ना", "एलोपेसिया", "जगह-जगह बाल उड़ना", "डैंड्रफ", "सूखी स्कैल्प", "तैलीय स्कैल्प", "सिर की त्वचा संक्रमण", "जूं", "हेयर ट्रांसप्लांट", "पीआरपी थेरेपी", "मेसोथेरेपी", "नाखून की समस्या", "नाखून संक्रमण", "नाखून अंदर घुसना", "नाखून टूटना", "नाखून का रंग बदलना", "त्वचा बायोप्सी", "एलर्जी टेस्ट", "त्वचा उपचार", "बालों का इलाज", "लेजर इलाज", "लेजर हेयर रिमूवल", "केमिकल पील", "माइक्रोडर्माब्रेशन", "बोटॉक्स", "फिलर्स", "एंटी एजिंग", "झुर्रियां", "महीन रेखाएं", "खुले रोमछिद्र", "असमान त्वचा रंग", "चमकदार त्वचा", "त्वचा निखार", "चेहरे पर दाग", "चेहरे की एलर्जी", "चेहरे पर दाने", "गर्दन काली होना", "बगल काली होना", "कोहनी काली", "घुटना काला", "स्ट्रेच मार्क्स", "सेल्युलाईट", "ज्यादा पसीना", "शरीर से बदबू",
            "dust allergy test", "skin allergy test", "एलर्जी टेस्ट", "धूल की एलर्जी टेस्ट", "स्किन एलर्जी टेस्ट",
            "mujhe bahut khujli ho rahi hai", "sharir me khujli ho rahi hai", "pure body me khujli", "skin allergy ho gayi", "skin lal ho gayi", "daane nikal aaye", "sharir par daane", "lal lal daane", "safed daag", "kale daag", "muh par daag", "face par daag", "face kala pad gaya", "garmi ke daane", "pasine ke daane", "dhoop se allergy", "dhoop me skin jal gayi", "pimples bahut ho rahe hain", "muhase ka ilaj", "pimple ke daag", "face pe nishan", "blackheads kaise hataye", "whiteheads", "skin oily hai", "skin dry ho gayi", "skin fat rahi hai", "skin utar rahi hai", "daad ho gaya", "khaj ho gayi", "ringworm ka ilaj", "fungal infection", "pair me daad", "jangh me khujli", "private part me khujli", "nail fungus", "nakhun kala ho gaya", "nakhun toot raha hai", "baal bahut jhad rahe hain", "hair fall treatment", "ganjapan", "hair transplant", "prp treatment", "dandruff bahut hai", "sir me khujli", "sir me daane", "sir me fungal infection", "joon ho gayi", "skin doctor", "skin specialist", "dermatologist near me", "hair doctor", "acne doctor", "vitiligo doctor", "psoriasis treatment", "eczema doctor", "allergy doctor", "laser treatment", "mole removal", "skin tag removal", "wart removal", "chemical peel", "glowing skin treatment", "face whitening", "pigmentation treatment", "neck kala ho gaya", "underarm kale ho gaye", "stretch marks treatment", "body itching doctor", "skin infection doctor"
          ],
          chest: [
            "cough", "asthma", "chest", "lungs", "breathing difficulty", "breath", "pulmonologist", "copd", "tuberculosis", "tb", "pneumonia", "bronchitis", "khansi", "dama", "saans", "seene me dard", "chhati me dard", "खांसी", "दमा", "अस्थमा", "फेफड़े", "सांस फूलना", "टीबी", "निमोनिया", "सीना", "छाती",
            "chest specialist", "pulmonologist", "lung specialist", "respiratory specialist", "respiratory doctor", "general chest doctor", "chest pain", "chest tightness", "chest heaviness", "chest burning", "pain while breathing", "breathlessness", "shortness of breath", "difficulty breathing", "fast breathing", "heavy breathing", "wheezing", "dry cough", "wet cough", "productive cough", "persistent cough", "night cough", "morning cough", "cough with blood", "blood in sputum", "mucus", "thick mucus", "green sputum", "yellow sputum", "white sputum", "coughing fits", "asthma", "asthma attack", "childhood asthma", "allergy", "dust allergy", "pollen allergy", "seasonal allergy", "smoke allergy", "copd", "chronic bronchitis", "bronchitis", "emphysema", "pulmonary fibrosis", "ild", "interstitial lung disease", "pleural effusion", "pneumothorax", "lung cancer", "sarcoidosis", "pulmonary hypertension", "pneumonia", "lung infection", "chest infection", "tuberculosis", "pulmonary tb", "mdr tb", "covid", "viral infection", "viral fever", "flu", "influenza", "sinus infection", "sleep apnea", "snoring", "loud snoring", "oxygen level", "low oxygen", "oxygen saturation", "spo2", "pulse oximeter", "nebulizer", "inhaler", "asthma pump", "spacer", "steam inhalation", "chest x-ray", "hrct chest", "ct chest", "pulmonary function test", "pft", "spirometry", "bronchoscopy", "sputum test", "mantoux test", "tb test", "allergy test", "chest checkup", "lung checkup", "breathing problem", "smoker's lung", "smoking damage", "passive smoking", "nicotine addiction", "quit smoking", "chest physiotherapy", "lung rehabilitation",
            "छाती रोग विशेषज्ञ", "फेफड़ों के डॉक्टर", "फेफड़ों के विशेषज्ञ", "श्वास रोग विशेषज्ञ", "चेस्ट डॉक्टर", "सीने में दर्द", "सीने में जकड़न", "सीना भारी लगना", "सीने में जलन", "सांस लेते समय दर्द", "सांस फूलना", "सांस लेने में दिक्कत", "सांस लेने में परेशानी", "तेज सांस चलना", "भारी सांस", "सांस में सीटी की आवाज", "सूखी खांसी", "बलगम वाली खांसी", "बलगम निकलना", "लगातार खांसी", "रात में खांसी", "सुबह खांसी", "खून वाली खांसी", "बलगम में खून", "बलगम", "गाढ़ा बलगम", "हरा बलगम", "पीला बलगम", "सफेद बलगम", "खांसी के दौरे", "अस्थमा", "अस्थमा का दौरा", "बच्चों का अस्थमा", "एलर्जी", "धूल से एलर्जी", "पराग एलर्जी", "मौसमी एलर्जी", "धुएं से एलर्जी", "सीओपीडी", "क्रोनिक ब्रोंकाइटिस", "ब्रोंकाइटिस", "एम्फायसीमा", "फेफड़ों में फाइब्रोसिस", "इंटरस्टिशियल लंग डिजीज", "फेफड़ों में पानी", "फेफड़ा बैठ जाना", "फेफड़ों का कैंसर", "सार्कोइडोसिस", "फेफडों का हाई बीपी", "निमोनिया", "फेफड़ों का संक्रमण", "छाती का संक्रमण", "तपेदिक", "फेफडों की टीबी", "दवा प्रतिरोधी टीबी", "कोविड", "वायरल संक्रमण", "वायरल बुखार", "फ्लू", "इन्फ्लुएंजा", "साइनस संक्रमण", "नींद में सांस रुकना", "खर्राटे", "तेज खर्राटे", "ऑक्सीजन लेवल", "ऑक्सीजन कम होना", "ऑक्सीजन सैचुरेशन", "ऑक्सीमीटर", "नेबुलाइज़र", "इनहेलर", "अस्थमा पंप", "स्पेसर", "भाप लेना", "छाती का एक्सरे", "एचआरसीटी चेस्ट", "सीटी चेस्ट", "फेफड़ों की क्षमता जांच", "स्पाइरोमेट्री", "ब्रोंकोस्कोपी", "बलगम जांच", "मैन्टॉक्स टेस्ट", "टीबी जांच", "एलर्जी टेस्ट", "छाती की जांच", "फेफड़ों की जांच", "सांस की समस्या", "धूम्रपान से फेफड़े खराब", "धूम्रपान से नुकसान", "परोक्ष धूम्रपान", "निकोटीन की लत", "धूम्रपान छोड़ना", "चेस्ट फिजियोथेरेपी", "फेफडों की पुनर्वास",
            "mujhe saans lene me dikkat ho rahi hai", "saans phool rahi hai", "saans ruk ruk ke aa rahi hai", "saans tez chal rahi hai", "seene me dard hai", "seena bhaari lag raha hai", "seene me jalan hai", "seene me dabaav lag raha hai", "khansi band nahi ho rahi", "bahut khansi aa rahi hai", "sukhi khansi", "balgam wali khansi", "gale me balgam jama hai", "balgam bahar nahi aa raha", "khansi me khoon aa raha hai", "bukhar ke sath khansi hai", "raat me khansi badh jati hai", "subah bahut khansi aati hai", "seeti jaisi awaz aati hai", "allergy ho gayi hai", "dhool se allergy hai", "mausam badalte hi khansi ho jati hai", "asthma ka ilaj", "asthma doctor", "inhaler use kaise kare", "pump se fayda nahi ho raha", "nebulizer karwana hai", "tb ke lakshan", "tb test", "tb doctor", "fefdo me infection hai", "fefdo me pani bhar gaya", "fefdo ka doctor", "chest doctor", "lung specialist", "pulmonologist near me", "chest x-ray karwana hai", "hrct chest", "pft test", "spirometry test", "oxygen level kam hai", "spo2 kam ho gaya", "kharate bahut aate hain", "neend me saans ruk jati hai", "smoking ki wajah se khansi", "cigarette chodne ka ilaj", "dum ghut raha hai", "gehri saans nahi le pa raha", "jaldi thak jata hu", "seedhi chadhte saans phoolti hai", "chalne par saans phoolti hai", "balgam me khoon aa raha hai", "chest infection doctor", "allergy specialist", "breathing problem doctor"
          ],
          medicine: [
            "fever", "khoon ki kami", "blood deficiency", "blood problem", "RBC ki kami", "WBC ki kami", "platelets", "haemoglobin", "cold", "diabetes", "stomach", "physician", "internal medicine", "blood pressure", "bp", "weakness", "infection", "bukhar", "bokhar", "sardi jukam", "sugar", "kamjori", "dengue", "dengu", "pet dard", "pet me dard", "बुखार", "सर्दी", "जुकाम", "मधुमेह", "शुगर", "बीपी", "कमजोरी", "डेंगू", "मलेरिया", "टायफाइड", "पेट दर्द", "geriatric", "geriatrics", "senior citizen", "old age", "bujurg", "budhape", "elderly", "malaria", "jaundice", "typhoid", "viral", "flu", "piliya", "vomit", "vomiting", "constipation", "diarrhea", "peela peshab", "piliya disease", "पीलिया", "मलेरिया", "टायफाइड",
            "sugar test", "diabetes test", "hba1c test", "hb1ac test", "fasting sugar", "pp sugar", "bukhar ka test", "dengue test", "malaria test", "typhoid test", "covid test", "tb test", "viral test", "tuberculosis test", "viral infection test", "fever investigation", "general health test", "sugar test karwana hai", "dengue test karwana hai", "malaria test karwana hai",
            "शुगर टेस्ट", "शुगर की जांच", "फास्टिंग शुगर", "खाना खाने के बाद शुगर", "hba1c टेस्ट", "डायबिटीज टेस्ट", "बुखार का टेस्ट", "कमजोरी का टेस्ट", "डेंगू टेस्ट कितने का है", "मलेरिया टेस्ट कहाँ होगा", "बुखार का कौन सा टेस्ट होता है", "डेंगू टेस्ट", "मलेरिया टेस्ट", "टाइफाइड टेस्ट", "कोविड टेस्ट", "टीबी टेस्ट", "वायरल टेस्ट", "पेट खराब का टेस्ट", "डायबिटीज टेस्ट"
          ],
          surgery: [
            "surgery", "surgeon", "laparoscopic", "gallstone", "gallstones", "hernia", "appendicitis", "appendix", "piles", "fissure", "fistula", "breast surgery", "operation", "pathri", "bawasir", "cheera", "cut", "ऑपरेशन", "सर्जरी", "पित्त की पथरी", "हर्निया", "अपेंडिक्स", "बवासीर",
            "general surgeon", "surgery doctor", "surgeon", "operation", "operation doctor", "hernia", "inguinal hernia", "umbilical hernia", "incisional hernia", "hernia operation", "hernia surgery", "appendix", "appendicitis", "appendix pain", "appendix operation", "gallbladder stone", "gall stone", "gallbladder pain", "gallbladder surgery", "laparoscopic surgery", "laser surgery", "open surgery", "minimally invasive surgery", "piles", "hemorrhoids", "bleeding piles", "internal piles", "external piles", "piles operation", "fissure", "anal fissure", "fissure pain", "fistula", "anal fistula", "fistula surgery", "pilonidal sinus", "pilonidal cyst", "abscess", "pus collection", "boil", "lump", "swelling", "lipoma", "sebaceous cyst", "cyst removal", "breast lump", "breast surgery", "thyroid lump", "thyroid surgery", "goiter", "varicose veins", "leg veins", "varicose surgery", "hydrocele", "hydrocele surgery", "circumcision", "phimosis", "nail surgery", "ingrown toenail", "diabetic foot", "foot ulcer", "non healing wound", "wound dressing", "burn injury", "burn treatment", "burn dressing", "skin grafting", "trauma", "accident injury", "cut injury", "deep cut", "stitches", "sutures", "stitch removal", "foreign body removal", "emergency surgery", "abdominal pain", "acute abdomen", "intestinal obstruction", "bowel obstruction", "colon surgery", "small intestine surgery", "stomach surgery", "gastric perforation", "peritonitis", "splenectomy", "spleen injury", "liver surgery", "pancreatic surgery", "biopsy", "fnac", "endoscopy", "colonoscopy", "minor surgery", "major surgery", "surgical consultation", "surgical dressing", "laparoscopic cholecystectomy", "laparoscopic hernia", "laparoscopic appendix", "mastectomy", "lumpectomy", "bariatric surgery", "weight loss surgery", "colostomy", "stoma surgery",
            "जनरल सर्जन", "सर्जरी डॉक्टर", "सर्जन", "ऑपरेशन करवाना है", "ऑपरेशन डॉक्टर", "हर्निया", "कमर का हर्निया", "नाभि का हर्निया", "ऑपरेशन के बाद हर्निया", "हर्निया ऑपरेशन", "अपेंडिक्स", "अपेंडिक्स की सूजन", "अपेंडिक्स दर्द", "अपेंडिक्स ऑपरेशन", "पित्ताशय की पथरी", "पित्त की पथरी", "पित्ताशय दर्द", "पित्ताशय ऑपरेशन", "लैप्रोस्कोपिक सर्जरी", "लेजर सर्जरी", "ओपन सर्जरी", "छोटी चीरे वाली सर्जरी", "बवासीर", "खून वाली बवासीर", "अंदरूनी बवासीर", "बाहरी बवासीर", "बवासीर ऑपरेशन", "फिशर", "गुदा में कट", "मलद्वार दर्द", "भगंदर", "गुदा भगंदर", "भगंदर ऑपरेशन", "पिलोनाइडल साइनस", "रीढ़ के पास गांठ", "फोड़ा", "पस भरना", "फुंसी", "गांठ", "सूजन", "चर्बी की गांठ", "तैलीय गांठ", "गांठ निकालना", "स्तन की गांठ", "स्तन ऑपरेशन", "थायराइड गांठ", "थायराइड ऑपरेशन", "घेंघा", "वैरिकोज वेन्स", "पैरों की नस फूलना", "नस ऑपरेशन", "हाइड्रोसील", "हाइड्रोसील ऑपरेशन", "खतना", "फिमोसिस", "नाखून ऑपरेशन", "नाखून अंदर घुसना", "डायबिटिक फुट", "पैर का घाव", "घाव नहीं भर रहा", "घाव की ड्रेसिंग", "जलना", "जलने का इलाज", "जलने की ड्रेसिंग", "स्किन ग्राफ्टिंग", "चोट", "दुर्घटना चोट", "कट लगना", "गहरा कट", "टांके", "टांके लगना", "टांके कटवाना", "शरीर से चीज निकालना", "इमरजेंसी ऑपरेशन", "पेट दर्द", "अचानक पेट दर्द", "आंत रुकना", "आंत बंद", "बड़ी आंत ऑपरेशन", "छोटी आंत ऑपरेशन", "पेट ऑपरेशन", "पेट में छेद", "पेट का संक्रमण", "तिल्ली निकालना", "तिल्ली में चोट", "लिवर ऑपरेशन", "अग्नाशय ऑपरेशन", "बायोप्सी", "एफएनएसी", "एंडोस्कोपी", "कोलोनोस्कोपी", "छोटी सर्जरी", "बड़ी सर्जरी", "सर्जरी सलाह", "सर्जिकल ड्रेसिंग",
            "pet me bahut dard ho raha hai", "pet ke niche dard hai", "nabhi ke paas dard", "appendix ka dard", "appendix operation", "hernia ho gaya hai", "nabhi bahar aa gayi", "pet me sujan hai", "gallbladder stone", "pitt ki pathri", "pitt ki pathri ka operation", "piles ka ilaj", "bawasir ka operation", "bawasir se khoon aa raha hai", "fissure ka ilaj", "bhagandar ka ilaj", "maldwar me dard hai", "maldwar se khoon aa raha hai", "baithne me dard hota hai", "gaanth ho gayi hai", "charbi ki gaanth", "lipoma operation", "gaanth nikalwani hai", "phoda ho gaya hai", "phoda pak gaya hai", "pus nikal raha hai", "ghav bhar nahi raha", "dressing karwani hai", "jal gaya hu", "burn treatment", "tanke lagwane hain", "tanke katwane hain", "chot lag gayi hai", "accident ho gaya", "pair me ghav hai", "sugar ka ghav", "diabetic foot", "hydrocele operation", "khatna karwana hai", "varicose veins ka ilaj", "pair ki nas phool gayi", "laser surgery", "laparoscopic surgery", "chhota operation", "general surgeon", "surgery doctor", "operation doctor", "pet ke doctor", "best surgeon near me", "operation hospital", "endoscopy karwani hai", "colonoscopy karwani hai", "biopsy karwani hai", "fnac test", "pet ka operation", "emergency operation", "pathri ka operation", "pitt ki pathri", "bawasir ka operation", "bawasir ka ilaj", "hernia ka ilaj", "hernia operation", "appendix nikaalna", "operation karwana hai", "surgery karwani hai", "laparoscopic operation", "fissure ka ilaj", "bleeding bawasir", "piles bleeding", "pilonidal cyst", "thyroid operation", "gale ki gath ka operation", "breast ki ganth ka operation", "koi ganth hai body mein", "pet mein ganth", "general surgery", "surgeon near me", "best surgeon", "पित्त की पथरी का ऑपरेशन", "बवासीर में खून", "हर्निया का दर्द", "अपेंडिक्स में दर्द"
          ],
          urology: [
            "urology", "urologist", "urinary", "urine", "kidney", "prostate", "kidney stone", "bladder", "renal", "peshab", "peshab me jalan", "peshab me dard", "mutra", "bar bar peshab aana", "पेशाब", "पेशाब में जलन", "किडनी", "किडनी की पथरी", "मूत्र",
            "urologist", "urology doctor", "kidney specialist", "urine problem", "urinary problem", "urine infection", "uti", "burning urination", "pain while urinating", "difficulty urinating", "frequent urination", "urgent urination", "night urination", "less urine", "no urine", "urine retention", "urine leakage", "urinary incontinence", "blood in urine", "cloudy urine", "foul smelling urine", "dark urine", "foamy urine", "kidney stone", "stone pain", "ureter stone", "bladder stone", "kidney pain", "flank pain", "lower back pain", "severe kidney pain", "hydronephrosis", "kidney swelling", "kidney infection", "pyelonephritis", "kidney failure", "chronic kidney disease", "ckd", "acute kidney injury", "aki", "dialysis", "hemodialysis", "peritoneal dialysis", "kidney transplant", "enlarged prostate", "bph", "prostate problem", "prostate cancer", "psa test", "erectile dysfunction", "weak erection", "male infertility", "low sperm count", "semen analysis", "testicular pain", "testicular swelling", "varicocele", "hydrocele", "phimosis", "circumcision", "bladder infection", "overactive bladder", "urinary catheter", "kidney function test", "creatinine test", "urea test", "urine routine", "urine culture", "cystoscopy", "uroflowmetry", "kub ultrasound", "ncct kub", "lithotripsy", "pcnl", "ursl", "rirs", "kidney surgery", "bladder surgery", "ureter surgery", "renal calculi", "urinary tract infection", "prostatitis", "nephrotic syndrome", "ureteroscopy", "eswl", "kidney stone breaking", "azoospermia", "vasectomy", "undescended testis", "scrotal swelling",
            "मूत्र रोग विशेषज्ञ", "यूरोलॉजी डॉक्टर", "किडनी विशेषज्ञ", "पेशाब की समस्या", "मूत्र समस्या", "पेशाब का संक्रमण", "यूरिन इन्फेक्शन", "पेशाब में जलन", "पेशाब करते समय दर्द", "पेशाब करने में दिक्कत", "बार-बार पेशाब आना", "अचानक पेशाब लगना", "रात में बार-बार पेशाब", "कम पेशाब आना", "पेशाब बंद होना", "पेशाब रुक जाना", "पेशाब निकल जाना", "पेशाब पर कंट्रोल न होना", "पेशाब में खून", "धुंधला पेशाब", "बदबूदार पेशाब", "गहरा पीला पेशाब", "झागदार पेशाब", "किडनी की पथरी", "पथरी का दर्द", "यूरेटर स्टोन", "मूत्राशय की पथरी", "किडनी में दर्द", "कमर के साइड में दर्द", "तेज किडनी दर्द", "किडनी में सूजन", "किडनी सूजना", "किडनी संक्रमण", "किडनी फेल होना", "पुरानी किडनी बीमारी", "डायलिसिस", "किडनी ट्रांसप्लांट", "बढ़ा हुआ प्रोस्टेट", "प्रोस्टेट बढ़ना", "प्रोस्टेट की समस्या", "प्रोस्टेट कैंसर", "पीएसए टेस्ट", "नपुंसकता", "इरेक्शन की समस्या", "पुरुष बांझपन", "शुक्राणु कम होना", "वीर्य जांच", "अंडकोष में दर्द", "अंडकोष में सूजन", "वैरिकोसील", "हाइड्रोसील", "फिमोसिस", "खतना", "मूत्राशय संक्रमण", "बार-बार पेशाब", "यूरिन कैथेटर", "किडनी जांच", "क्रिएटिनिन टेस्ट", "यूरिया टेस्ट", "पेशाब जांच", "यूरिन कल्चर", "सिस्टोस्कोपी", "यूरोफ्लोमेट्री", "किडनी अल्ट्रासाउंड", "स्टोन सीटी स्कैन", "पथरी तोड़ना", "पीसीएनएल", "यूआरएसएल", "आरआईआरएस", "किडनी ऑपरेशन", "ब्लैडर ऑपरेशन", "यूरेटर ऑपरेशन",
            "kidney test", "peshab test", "peshab ki jaanch", "urine test", "kft test", "creatinine test", "urea test", "urine culture", "kidney function test", "blood urea", "urinalysis", "kidney test कहाँ होता है", "पेशाब की जांच करवानी है", "किडनी टेस्ट", "क्रिएटिनिन टेस्ट", "यूरिया टेस्ट", "पेशाब की जांच", "पेशाब टेस्ट", "यूरिन टेस्ट",
            "peshab mein jalan hai", "bar bar peshab aa raha hai", "peshab nahi aa raha", "peshab mein khoon aa raha hai", "peshab ka rang badal gaya", "peshab rokna mushkil hai", "raat ko baar baar peshab", "kidney mein dard hai", "kidney stone hai", "pathri ka dard", "pathri nikaalwani hai", "pathri todwani hai", "dialysis karwani hai", "kidney transplant chahiye", "prostate problem hai", "peshab dhire aata hai", "peshab ki naali mein problem", "uti ka ilaj", "urine infection", "peshab mein infection", "best urologist", "kidney doctor", "kidney specialist near me", "kidney stone treatment", "urologist near me", "kidney problem ka ilaj", "pathri doctor",
            "peshab me jalan ho rahi hai", "peshab karte waqt dard hota hai", "baar baar peshab aa raha hai", "raat me bahut peshab aata hai", "peshab ruk ruk ke aa raha hai", "peshab nahi aa raha", "peshab me khoon aa raha hai", "peshab pe control nahi hai", "kapdo me peshab nikal jata hai", "peshab se badbu aa rahi hai", "peshab ka rang peela hai", "peshab me jhaag aa raha hai", "kidney me dard hai", "kamar ke side me dard hai", "pathri ka dard", "kidney stone ka ilaj", "pathri nikalwani hai", "kidney doctor", "urologist near me", "kidney specialist", "dialysis doctor", "creatinine badh gaya hai", "urea badh gaya hai", "kidney fail ho gayi", "prostate ki problem hai", "prostate operation", "peshab ruk jata hai", "peshab ki nali me dard", "andkosh me dard", "andkosh suj gaya hai", "hydrocele operation", "varicocele treatment", "weak erection", "mardana kamzori", "sperm test", "sperm count kam hai", "baccha nahi ho raha", "male infertility doctor", "semen test", "kidney ultrasound", "stone operation", "laser stone surgery", "bladder infection", "urine infection doctor", "best urologist", "kidney hospital", "kidney transplant doctor", "urine test karwana hai", "psa test", "peshab ki problem doctor",
            "किडनी की पथरी का दर्द", "पेशाब में जलन है", "बार-बार पेशाब आना", "किडनी में दर्द"
          ],
          ent: [
            "anesthesia", "anaesthetic", "sedation", "ventilator", "icu", "critical care", "intensive care", "unconscious", "pain block", "numbness", "behoshi", "behosh", "sunn karna", "sun", "बेहोशी", "बेहोश", "सुन्न करना", "आईसीयू", "वेंटीलेटर",
            "ent specialist", "ent doctor", "ear specialist", "nose specialist", "throat specialist", "ear nose throat", "ear problem", "ear pain", "ear infection", "ear swelling", "ear discharge", "ear pus", "ear bleeding", "hearing loss", "sudden hearing loss", "hearing problem", "hard of hearing", "deafness", "ear blockage", "ear wax", "ear cleaning", "ear wax removal", "ear ringing", "tinnitus", "buzzing sound", "ringing in ear", "buzzing in ear", "vertigo", "balance problem", "dizziness", "ear vertigo", "ear hole", "ear drum perforation", "eardrum perforation", "ear surgery", "mastoid surgery", "ear itching", "ear blocked", "nose block", "blocked nose", "runny nose", "watery nose", "sneezing", "continuous sneezing", "nose bleeding", "nose bleed", "nasal bleeding", "nasal allergy", "dust allergy", "pollen allergy", "sinus", "sinus infection", "sinus headache", "sinus pressure", "facial pain", "sinus problem", "sinusitis", "chronic sinusitis", "nasal polyps", "nasal polyp", "deviated septum", "dns", "nose fracture", "smell loss", "loss of smell", "bad smell in nose", "nasal congestion", "stuffy nose", "throat pain", "sore throat", "throat infection", "tonsils", "tonsillitis", "swollen tonsils", "difficulty swallowing", "pain while swallowing", "voice change", "hoarseness", "hoarse voice", "lost voice", "voice loss", "dry throat", "burning throat", "mouth breathing", "snoring", "sleep apnea", "bad breath", "mouth ulcers", "salivary gland swelling", "neck lump", "neck swelling", "thyroid swelling", "laryngitis", "pharyngitis", "epiglottitis", "vocal cord problem", "vocal cord nodule", "adenoids", "difficulty speaking", "lump in throat", "throat cancer", "head and neck", "salivary gland problem", "dry mouth", "mouth ulcer", "allergic rhinitis", "ent endoscopy", "nasal endoscopy", "audiometry", "hearing test", "tympanometry", "speech therapy", "cochlear implant", "hearing aid", "tonsil surgery", "adenoid surgery", "septoplasty", "fess surgery", "microlaryngeal surgery",
            "ईएनटी विशेषज्ञ", "कान नाक गला डॉक्टर", "कान के डॉक्टर", "नाक के डॉक्टर", "गले के डॉक्टर", "कान में दर्द", "कान का संक्रमण", "कान सूजना", "कान से पानी आना", "कान से मवाद", "कान से खून", "सुनाई कम देना", "अचानक सुनाई बंद", "कान बंद होना", "कान का मैल", "कान की सफाई", "कान में आवाज आना", "कान में सीटी बजना", "भनभनाहट", "चक्कर", "संतुलन बिगड़ना", "चक्कर आना", "कान का पर्दा फटना", "कान का ऑपरेशन", "मास्टॉइड ऑपरेशन", "नाक बंद", "नाक बंद होना", "नाक बहना", "नाक से पानी", "छींक आना", "लगातार छींक", "नाक से खून", "नाक की एलर्जी", "धूल से एलर्जी", "पराग एलर्जी", "साइनस", "साइनस संक्रमण", "साइनस सिर दर्द", "चेहरे में दबाव", "चेहरे में दर्द", "नाक में मांस बढ़ना", "नाक की हड्डी टेढ़ी", "डीएनएस", "नाक टूटना", "सूंघने की शक्ति कम", "गंध नहीं आना", "नाक से बदबू", "गले में दर्द", "गला खराब", "गले का संक्रमण", "टॉन्सिल", "टॉन्सिल की सूजन", "टॉन्सिल सूजना", "निगलने में दिक्कत", "निगलते समय दर्द", "आवाज बदलना", "आवाज बैठना", "आवाज चली गई", "गला सूखना", "गले में जलन", "मुंह से सांस लेना", "खर्राटे", "नींद में सांस रुकना", "मुंह से बदबू", "मुंह के छाले", "लार ग्रंथि सूजन", "गर्दन में गांठ", "गर्दन सूजना", "थायराइड सूजन", "स्वरयंत्र की सूजन", "गले की सूजन", "एपिग्लॉटिस संक्रमण", "वोकल कॉर्ड समस्या", "वोकल कॉर्ड गांठ", "ईएनटी एंडोस्कोपी", "नाक एंडोस्कोपी", "सुनने की जांच", "सुनने का टेस्ट", "कान का प्रेशर टेस्ट", "स्पीच थेरेपी", "कॉक्लियर इम्प्लांट", "सुनने की मशीन", "टॉन्सिल ऑपरेशन", "एडेनॉइड ऑपरेशन", "नाक की हड्डी ऑपरेशन", "साइनस ऑपरेशन", "गले की सर्जरी",
            "kaan me dard hai", "kaan se pani aa raha hai", "kaan se khoon aa raha hai", "kaan pak gaya hai", "kaan me mail jam gaya", "sunai kam de rahi hai", "sunai band ho gayi", "kaan me ghanti bajti hai", "kaan me seeti bajti hai", "chakkar aa rahe hain", "balance nahi ban raha", "naak band hai", "naak se pani aa raha hai", "baar baar chheenk aa rahi hai", "naak se khoon aa raha hai", "naak me maas aa gaya", "naak ki haddi tedhi hai", "sinus ki problem hai", "sir bhaari rehta hai", "chehre me dard hai", "gala dard kar raha hai", "gala baith gaya hai", "gala sukh raha hai", "gala me jalan hai", "gala me infection hai", "gala me sujan hai", "tonsil ho gaya", "tonsil ka operation", "nigalne me dard hota hai", "khana nigalne me dikkat", "aawaz baith gayi", "aawaz nahi nikal rahi", "muh se badbu aati hai", "muh ke chhale", "kharate bahut aate hain", "neend me saans ruk jati hai", "gardan me gaanth hai", "gardan suj gayi", "ent doctor", "kaan doctor", "naak doctor", "gala doctor", "best ent specialist", "hearing test", "audiometry test", "hearing machine", "hearing aid", "cochlear implant", "sinus operation", "naak ka operation", "tonsil operation", "fess surgery", "voice doctor", "speech therapy", "ear cleaning", "nose allergy doctor", "dust allergy treatment", "allergy specialist", "chheenk band nahi ho rahi", "kaan ki safai", "naak ka ilaj", "gala ka ilaj", "kaan mein dard hai", "kaan se pani aa raha hai", "kaan mein awaz aa rahi hai", "kaan mein seeti", "kaan band ho gaya", "sunai nahi de raha", "behrapan ho gaya", "naak se khoon aa raha hai", "naak beh rahi hai", "sinus mein dard", "saans lene mein dikkat", "nasal allergy", "kharchate aate hain", "gale mein dard hai", "gale mein infection", "tonsils badh gaye", "gale mein ganth hai", "bolne mein dikkat", "awaz nahi nikal rahi", "awaz baith gayi", "ent doctor near me", "kaan ke doctor", "naak ke doctor", "gale ke doctor", "tonsils ka operation", "adenoids ka operation", "sinusitis ka ilaj", "ear wax nikalna", "nasal polyp ka ilaj", "कान में दर्द है", "कान से पानी आ रहा है", "नाक से खून आ रहा है", "गले में दर्द है", "टॉन्सिल का डॉक्टर", "सुनाई नहीं देता"
          ],
          cardio: [
            "heart", "cardio", "cardiologist", "angioplasty", "pacemaker", "heart attack", "heart failure", "heart blocker", "bypass surgery", "cardiac", "chest pain", "heart disease", "cardiology", "heart specialist", "palpitations",
            "cardiologist", "heart doctor", "heart specialist", "heart disease", "heart problem", "chest pain", "left chest pain", "chest tightness", "chest pressure", "chest heaviness", "burning chest", "pain while walking", "pain while climbing stairs", "pain during exercise", "heart attack", "mild heart attack", "silent heart attack", "cardiac arrest", "angina", "coronary artery disease", "heart block", "blocked arteries", "heart failure", "congestive heart failure", "weak heart", "enlarged heart", "cardiomyopathy", "valve disease", "mitral valve disease", "aortic valve disease", "heart murmur", "high blood pressure", "hypertension", "low blood pressure", "bp problem", "bp fluctuation", "pulse rate", "fast heartbeat", "slow heartbeat", "irregular heartbeat", "palpitations", "racing heart", "skipped heartbeat", "arrhythmia", "atrial fibrillation", "tachycardia", "bradycardia", "dizziness", "fainting", "breathlessness", "difficulty breathing", "swollen legs", "swollen feet", "fatigue", "weakness", "excess sweating", "cold sweating", "pain in left arm", "pain in jaw", "neck pain", "back pain due to heart", "diabetes with heart disease", "cholesterol", "high cholesterol", "triglycerides", "hdl", "ldl", "heart checkup", "ecg", "electrocardiogram", "echo", "2d echo", "tmt test", "stress test", "holter monitoring", "angiography", "ct angiography", "coronary angiography", "angioplasty", "stent", "heart stent", "bypass surgery", "cabg", "pacemaker", "icd device", "heart surgery", "open heart surgery", "valve replacement", "heart rehabilitation", "blood thinner", "cardiac icu", "emergency cardiac care", "heart blockage symptoms", "heart attack symptoms", "mild heart attack symptoms", "heart failure symptoms", "heart valve disease", "heart enlargement", "high bp treatment", "low bp treatment", "fast pulse", "slow pulse", "chest pain causes", "heart checkup package", "executive cardiac checkup", "preventive heart screening", "family history of heart disease", "smoking and heart disease", "diabetes and heart disease", "cholesterol treatment", "heart healthy diet", "heart exercise", "cardiac rehabilitation", "heart emergency", "sudden chest pain", "sudden breathlessness", "heart monitoring", "blood pressure monitor", "home bp machine", "ecg at home", "heart screening",
            "दिल", "धड़कन", "हृदय रोग विशेषज्ञ", "दिल के डॉक्टर", "हार्ट स्पेशलिस्ट", "हृदय रोग", "दिल की समस्या", "सीने में दर्द", "बाएं सीने में दर्द", "सीने में जकड़न", "सीने में दबाव", "सीना भारी लगना", "सीने में जलन", "चलने पर सीने में दर्द", "सीढ़ी चढ़ते दर्द", "एक्सरसाइज में दर्द", "हार्ट अटैक", "हल्का हार्ट अटैक", "साइलेंट हार्ट अटैक", "कार्डियक अरेस्ट", "एनजाइना", "हृदय की नसों में रुकावट", "हार्ट ब्लॉक", "दिल की नस ब्लॉक", "हार्ट फेलियर", "हार्ट की कमजोरी", "दिल कमजोर होना", "दिल बड़ा होना", "हार्ट मांसपेशी की बीमारी", "हार्ट वाल्व की बीमारी", "माइट्रल वाल्व समस्या", "एओर्टिक वाल्व समस्या", "दिल में आवाज", "हाई ब्लड प्रेशर", "उच्च रक्तचाप", "लो ब्लड प्रेशर", "ब्लड प्रेशर की समस्या", "बीपी ऊपर नीचे होना", "नाड़ी की गति", "दिल तेजी से धड़कना", "दिल धीरे धड़कना", "धड़कन अनियमित", "दिल की धड़कन महसूस होना", "दिल बहुत तेज चलना", "धड़कन छूटना", "अनियमित धड़कन", "एट्रियल फिब्रिलेशन", "तेज धड़कन", "धीमी धड़कन", "चक्कर आना", "बेहोश होना", "सांस फूलना", "सांस लेने में दिक्कत", "पैरों में सूजन", "पैरों के पंजे सूजना", "थकान", "कमजोरी", "ज्यादा पसीना", "ठंडा पसीना", "बाएं हाथ में दर्द", "जबड़े में दर्द", "गर्दन में दर्द", "पीठ में दिल का दर्द", "शुगर और दिल की बीमारी", "कोलेस्ट्रॉल", "कोलेस्ट्रॉल बढ़ना", "ट्राइग्लिसराइड", "अच्छा कोलेस्ट्रॉल", "खराब कोलेस्ट्रॉल", "दिल की जांच", "ईसीजी", "हृदय की जांच", "इको", "टू डी इको", "ट्रेडमिल टेस्ट", "स्ट्रेस टेस्ट", "24 घंटे ईसीजी", "एंजियोग्राफी", "सीटी एंजियोग्राफी", "दिल की नस जांच", "एंजियोप्लास्टी", "स्टेंट", "हार्ट स्टेंट", "बायपास सर्जरी", "सीएबीजी", "पेसमेकर", "आईसीडी", "हार्ट ऑपरेशन", "ओपन हार्ट सर्जरी", "वाल्व बदलना", "हार्ट रिहैब", "खून पतला करने की दवा", "कार्डियक आईसीयू", "आपातकालीन हृदय इलाज", "दिल का दौरा", "हृदय रोग विभाग", "दिल की बीमारी", "हार्ट विशेषज्ञ", "कार्डियोलॉजिस्ट", "दिल जोर से धड़क रहा है",
            "seene me dard ho raha hai", "dil me dard ho raha hai", "dil ghabra raha hai", "dil bahut tez dhadak raha hai", "dhadkan tez chal rahi hai", "dhadkan dheere chal rahi hai", "dil ki dhadkan ruk ruk ke chal rahi hai", "dil ki dhadkan miss ho rahi hai", "bp high hai", "bp low hai", "bp check karwana hai", "seena bhaari lag raha hai", "seene me jalan hai", "saans phool rahi hai", "seedhi chadhte saans phoolti hai", "chalne par saans phoolti hai", "left side chest pain", "baaye haath me dard", "kandhe tak dard ja raha hai", "jabde me dard hai", "pasina bahut aa raha hai", "thanda pasina aa raha hai", "chakkar aa rahe hain", "behosh ho gaya tha", "pair suj gaye hain", "pairon me sujan hai", "dil kamzor ho gaya hai", "dil ki nas block hai", "heart blockage", "angiography karwani hai", "angioplasty karwani hai", "stent lagwana hai", "bypass operation", "heart operation", "ecg karwana hai", "echo test", "tmt test", "holter test", "heart checkup", "cholesterol badh gaya hai", "triglyceride badh gaya hai", "sugar aur bp dono hai", "dil ka doctor", "heart specialist", "cardiologist near me", "best cardiologist", "emergency heart doctor", "pacemaker lagwana hai", "heart valve problem", "open heart surgery", "cardiac hospital", "dil ki bimari", "dil ka ilaj", "dil ki jaanch", "heart test", "seene ka doctor", "dil ki nas ki jaanch", "dil ki surgery", "dil me dard", "seene me dard", "dil ka daura", "angioplasty operation", "pacemaker lagna", "seene mein dard", "bp control", "dil tez dhadak raha hai", "seene mein dabaav lag raha hai", "dil zor se dhadak raha hai", "dil dhadak raha hai",
            "dil ka test", "ecg", "2d echo", "tmt test", "troponin test", "treadmill test", "echocardiography", "ecg test", "ecg karwana hai", "दिल का टेस्ट", "ईसीजी", "2d इको", "tmt टेस्ट", "ट्रोपोनिन टेस्ट"
          ]
        };

        let matchedCategory = null;
        let maxMatches = 0;

        Object.keys(keywordMap).forEach(category => {
          let matches = 0;
          keywordMap[category].forEach(keyword => {
            if (normalized.includes(keyword)) {
              matches++;
            }
          });
          if (matches > maxMatches) {
            maxMatches = matches;
            matchedCategory = category;
          }
        });

        if (matchedCategory && maxMatches > 0) {
          const matchedDocs = DOCTORS.filter(d => d.specialty === matchedCategory);
          if (matchedDocs.length > 0) {
            const specLabel = SPECIALTIES[matchedCategory] || "Specialist";
            return {
              reply: isHinglish
                ? `Aapke symptoms ke hisab se, main aapko ${specLabel} ke specialist se consult karne ki salah doonga. Hamari list ke sahi doctors ye hain:`
                : `Based on your symptoms, I suggest consulting a specialist in ${specLabel}. Here are suitable doctors from our list:`,
              recommended_doctor_ids: matchedDocs.map(d => d.id)
            };
          }
        }

        return {
          reply: isHinglish
            ? "Mujhe aapke message mein koi specific symptoms nahi mile. Kripya apne symptoms batayein (jaise khansi, bukhar, ghutne me dard, aankh ki samasya) ya medical report upload karein taaki main sahi doctor ka sujhav de sakoon."
            : "I couldn't identify any specific medical symptoms in your message. Please describe your symptoms (e.g., cough, fever, joint pain, eye issue) or upload a medical report so I can suggest the right doctor.",
          recommended_doctor_ids: []
        };
      };

      const result = await callGemini(messages, offlineFallback);

      // Remove typing loader first to keep sequence clean
      State.chatHistory = State.chatHistory.filter(msg => msg.text !== typingMsg);
      appendMessage("bot", result.reply, null, result.recommended_doctor_ids || []);
    } catch (err) {
      console.error("Error in analyzeSymptomsAndRespond:", err);
      State.chatHistory = State.chatHistory.filter(msg => msg.text !== typingMsg);
      const errMsg = isHinglish
        ? "Maaf kijiyega, kuch takniki dikkat aa gayi hai. Kripya thodi der baad dobara koshish karein."
        : "I'm sorry, I encountered a technical issue. Please try again in a moment.";
      appendMessage("bot", errMsg);
    } finally {
      State.chatHistory = State.chatHistory.filter(msg => msg.text !== typingMsg);
      localStorage.setItem("magnum_chat_history", JSON.stringify(State.chatHistory));
      renderChatHistory();
      setChatbotLoadingState(false);
    }
  }

  // Register Chatbot Listeners
  DOM.chatbotLauncher.addEventListener("click", () => {
    if (DOM.chatbotPanel.classList.contains("active")) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  DOM.chatbotCloseBtn.addEventListener("click", closeChatbot);
  DOM.chatbotSendBtn.addEventListener("click", handleSendMessage);
  DOM.chatbotTextInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  DOM.chatbotAttachBtn.addEventListener("click", () => {
    DOM.chatbotFileInput.click();
  });

  function updateChatbotHeaderMode(isOnline) {
    if (!DOM.chatbotHeaderMode) return;
    if (isOnline) {
      DOM.chatbotHeaderMode.innerText = "Online AI Mode";
      if (DOM.chatbotStatusDot) {
        DOM.chatbotStatusDot.style.background = "#10b981";
        DOM.chatbotStatusDot.style.boxShadow = "0 0 8px #10b981";
      }
    } else {
      DOM.chatbotHeaderMode.innerText = "Offline Fallback Mode";
      if (DOM.chatbotStatusDot) {
        DOM.chatbotStatusDot.style.background = "#94a3b8";
        DOM.chatbotStatusDot.style.boxShadow = "none";
      }
    }
  }

  // Initialize status as Online AI Mode on startup
  updateChatbotHeaderMode(true);

  async function analyzeReportAndRespond(fileName) {
    const normalized = fileName.toLowerCase();
    const isHinglish = (State.chatLanguage === "hinglish");

    const doctorsBrief = DOCTORS.map(d => ({
      id: d.id,
      name: d.name,
      degrees: d.degrees,
      specialty: d.specialty,
      hospital: d.hospital,
      bio: d.bio,
      location: d.location,
      fees: d.fees
    }));

    const systemPrompt = `You are a helpful medical assistant chatbot for the MagnumKare network in Shahjahanpur city, Uttar Pradesh, India.
Your goal is to analyze the file name of a medical report uploaded by the user, detect the likely department or specialty, and recommend appropriate doctors from the network.

Here is the database of available doctors in the MagnumKare network:
${JSON.stringify(doctorsBrief, null, 2)}

Instructions:
1. Respond in the user's preferred language style (Hinglish/mixed if preferredLanguage is hinglish, otherwise English).
2. The current preferred language is: ${State.chatLanguage}.
3. Based on the file name of the report, identify the specialty/department, choose suitable doctors from the database, explain what the report likely concerns, and list the doctor IDs in the "recommended_doctor_ids" array.
4. If the report type is completely unclassifiable, recommend a General Medicine specialist (General Medicine specialty) for review.
5. You MUST return your response ONLY as a JSON object with the following fields:
{
  "reply": "your report analysis summary response here",
  "recommended_doctor_ids": ["doc-id1", "doc-id2"]
}
Make sure recommended_doctor_ids contains ONLY the exact string IDs of matched doctors from the database above.`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `I have uploaded a report named: ${fileName}` }
    ];

    const offlineFallback = () => {
      const reportKeywords = {
        eye: ["eye", "optom", "vision", "cataract", "glaucoma", "sight", "retina", "blind", "ophthal"],
        pediatric: ["child", "baby", "pediatric", "neonat", "kid", "infant", "childhood"],
        gyne: ["preg", "delivery", "period", "gyne", "gynaec", "ivf", "fertility", "uterus", "ovary", "usg", "obstet"],
        dental: ["dent", "tooth", "teeth", "braces", "aligner", "orthodont", "cavity", "opg"],
        patho: ["blood", "cbc", "biochem", "patho", "thyroid", "lipid", "urine", "hba1c", "serum", "cholesterol", "liver"],
        neuro: ["brain", "neuro", "spine", "mri", "eeg", "stroke", "migraine", "headache"],
        ortho: ["joint", "bone", "fracture", "ortho", "knee", "hip", "ligament", "sprain", "xray", "x-ray"],
        derma: ["skin", "acne", "pimple", "derma", "hair", "scalp", "allergy", "melasma", "eczema"],
        chest: ["chest", "lung", "cough", "asthma", "pulmono", "tb", "copd", "pneumonia", "sputum", "respiratory", "bronch"],
        surgery: ["surgery", "surgeon", "laparoscopic", "gallstone", "gallstones", "hernia", "appendicitis", "appendix", "piles", "fissure", "fistula", "breast"],
        urology: ["urology", "kidney", "urine", "prostate", "bladder", "stone", "renal", "peshab", "mutra"],
        cardio: ["heart", "cardio", "ecg", "echo", "angio", "pacemaker", "cardiac", "dhadkan", "dil", "chest pain", "seene"]
      };

      let matchedCategory = null;

      Object.keys(reportKeywords).forEach(category => {
        reportKeywords[category].forEach(keyword => {
          if (normalized.includes(keyword)) {
            matchedCategory = category;
          }
        });
      });

      if (matchedCategory) {
        const matchedDocs = DOCTORS.filter(d => d.specialty === matchedCategory);
        if (matchedDocs.length > 0) {
          const specLabel = SPECIALTIES[matchedCategory] || "Specialist";
          return {
            reply: isHinglish
              ? `Report Analysis Complete: Is document ke hisab se indicators ${specLabel} se related hain. In findings ke aadhar par, main niche diye gaye doctor(s) se consult karne ki salah doonga:`
              : `Report Analysis Complete: The document suggests indicators related to ${specLabel}. Based on these findings, I suggest consulting the following doctor(s):`,
            recommended_doctor_ids: matchedDocs.map(d => d.id)
          };
        }
      }

      const medicineDocs = DOCTORS.filter(d => d.specialty === "medicine");
      return {
        reply: isHinglish
          ? `Report Analysis Complete: Hum is report ke file name se iski specific category nahi pehchan paye. General medical sawalo ke liye, main General Medicine specialist se consult karne ki salah doonga:`
          : `Report Analysis Complete: We couldn't classify this report's specific department from the file name. For general medical queries and reviews, I suggest consulting a General Medicine specialist:`,
        recommended_doctor_ids: medicineDocs.map(d => d.id)
      };
    };

    try {
      const result = await callGemini(messages, offlineFallback);
      appendMessage("bot", result.reply, null, result.recommended_doctor_ids || []);
    } catch (err) {
      console.error("Error in analyzeReportAndRespond:", err);
      const errMsg = isHinglish
        ? "Maaf kijiyega, report analyze karne mein kuch dikkat aayi. Kripya thodi der baad dobara koshish karein."
        : "I'm sorry, I encountered an issue analyzing the report. Please try again in a moment.";
      appendMessage("bot", errMsg);
    } finally {
      setChatbotLoadingState(false);
    }
  }

  DOM.chatbotFileInput.addEventListener("change", (e) => {
    if (isChatbotProcessing) return;
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      showToast("Invalid File", "Please select a valid image or PDF report.", "warning");
      return;
    }

    setChatbotLoadingState(true);

    const reader = new FileReader();
    reader.onerror = function () {
      setChatbotLoadingState(false);
      showToast("Upload Error", "Failed to read file.", "danger");
    };
    reader.onload = function (evt) {
      const base64Url = evt.target.result;

      let cachedImages = [];
      const stored = sessionStorage.getItem("magnum_session_images");
      if (stored) {
        cachedImages = JSON.parse(stored);
      }
      cachedImages.push(base64Url);
      sessionStorage.setItem("magnum_session_images", JSON.stringify(cachedImages));

      appendMessage("user", file.name, base64Url);

      const isHinglish = (State.chatLanguage === "hinglish");
      const analyzingMsg = isHinglish
        ? `Report (${file.name}) ko analyze kiya ja raha hai... Kripya thoda intezar karein.`
        : `Analyzing report (${file.name})... Please wait.`;

      appendMessage("bot", analyzingMsg);

      setTimeout(() => {
        State.chatHistory = State.chatHistory.filter(msg =>
          !msg.text.startsWith("Analyzing report") &&
          !msg.text.includes("ko analyze kiya ja raha hai")
        );
        localStorage.setItem("magnum_chat_history", JSON.stringify(State.chatHistory));
        renderChatHistory();

        analyzeReportAndRespond(file.name);
      }, 2000);
    };
    reader.readAsDataURL(file);
    DOM.chatbotFileInput.value = "";
  });
});
