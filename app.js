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
  medicine: "General Medicine / Internal Medicine"
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
    degrees: "MBBS, MDS - Consultant Orthodontist",
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
  partnerId: ""
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
  chatbotFileInput: document.getElementById("chatbot-file-input")
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
    id: `notif-${Date.now()}-${Math.floor(Math.random()*1000)}`,
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
        <a href="https://wa.me/919336300420?text=Hello%20MagnumKare%20Helpdesk,%20here%20are%20the%20details%20for%20Patient%20Referral%20ID%20${booking.id}.%20Patient:%20${encodeURIComponent(booking.patientName)}%20(${booking.age}%20yrs),%20referred%20to%20Dr.%20${encodeURIComponent(booking.doctorName)}%20for%20${booking.date}%20at%20${booking.time}.%20Status:%20${booking.status.toUpperCase()}." target="_blank" class="btn-whatsapp" title="WhatsApp Referral Details to MagnumKare">
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

  function renderChatHistory() {
    if (!DOM.chatbotMessagesContainer) return;
    DOM.chatbotMessagesContainer.innerHTML = "";
    if (State.chatHistory.length === 0) {
      appendMessage("bot", "Hello! I'm your MagnumKare AI assistant. Share your symptoms or ask about our doctors, and I'll suggest the best specialist for you!");
    } else {
      State.chatHistory.forEach(msg => {
        renderMessageBubble(msg);
      });
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
    lucide.createIcons();
  }

  window.openDoctorFromChat = function(docId) {
    const doc = DOCTORS.find(d => d.id === docId);
    if (doc) {
      selectDoctor(doc);
      closeChatbot();
    }
  };

  function openChatbot() {
    DOM.chatbotPanel.classList.add("active");
    DOM.chatbotLauncherBadge.classList.remove("active");
    DOM.chatbotLauncher.classList.add("chatbot-open");
    renderChatHistory();
  }
  
  function closeChatbot() {
    DOM.chatbotPanel.classList.remove("active");
    DOM.chatbotLauncher.classList.remove("chatbot-open");
  }

  function handleSendMessage() {
    const text = DOM.chatbotTextInput.value.trim();
    if (!text) return;
    
    appendMessage("user", text);
    DOM.chatbotTextInput.value = "";
    
    setTimeout(() => {
      analyzeSymptomsAndRespond(text);
    }, 1000);
  }

  function analyzeSymptomsAndRespond(userText) {
    const normalized = userText.toLowerCase().trim();
    
    // Check for basic greetings first
    const greetings = ["hi", "hello", "hey", "hola", "greetings", "namaste", "good morning", "good afternoon", "good evening", "sup", "wassup"];
    const cleanText = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    
    if (greetings.includes(cleanText)) {
      let greetingResponse = "Hello! ";
      if (cleanText === "good morning") {
        greetingResponse = "Good morning! ";
      } else if (cleanText === "good afternoon") {
        greetingResponse = "Good afternoon! ";
      } else if (cleanText === "good evening") {
        greetingResponse = "Good evening! ";
      } else if (cleanText === "namaste") {
        greetingResponse = "Namaste! ";
      }
      
      appendMessage(
        "bot", 
        greetingResponse + "How can I help you today? Please share your symptoms or ask about our doctors, and I'll suggest the best specialist for you!"
      );
      return;
    }
    
    const keywordMap = {
      eye: ["eye", "eyes", "vision", "cataract", "blind", "blurry", "glasses", "sight", "glaucoma", "redness", "conjunctivitis"],
      pediatric: ["child", "baby", "newborn", "kid", "kids", "infant", "pediatric", "teething", "vaccination", "picu", "crying"],
      gyne: ["pregnant", "pregnancy", "delivery", "period", "periods", "gynecologist", "gynaecologist", "ivf", "fertility", "uterus", "ovary", "menstruation"],
      dental: ["tooth", "teeth", "dentist", "braces", "dental", "aligners", "gums", "cavity", "toothache", "mouth", "dental implant"],
      patho: ["blood test", "lab report", "biochemistry", "pathology", "hormone", "thyroid test", "tumor", "diagnostic"],
      neuro: ["brain", "spine", "neuro", "nerve", "neurologist", "neurosurgeon", "disc", "back pain", "paralysis", "stroke", "migraine", "headache", "seizure"],
      ortho: ["joint", "joint pain", "bone", "fracture", "orthopedics", "knee", "hip", "arthritis", "ligament", "sprain", "ortho"],
      derma: ["skin", "acne", "pimples", "dermatologist", "hair fall", "melasma", "psoriasis", "rash", "itching", "eczema", "hair loss"],
      chest: ["cough", "asthma", "chest", "lungs", "breathing difficulty", "breath", "pulmonologist", "copd", "tuberculosis", "tb", "pneumonia", "bronchitis"],
      medicine: ["fever", "cold", "diabetes", "stomach", "physician", "internal medicine", "blood pressure", "bp", "weakness", "infection"]
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
        const docIds = matchedDocs.map(d => d.id);
        const specLabel = SPECIALTIES[matchedCategory] || "Specialist";
        appendMessage(
          "bot", 
          `Based on your symptoms, I suggest consulting a specialist in ${specLabel}. Here are suitable doctors from our list:`, 
          null, 
          docIds
        );
        return;
      }
    }

    const medicineDocs = DOCTORS.filter(d => d.specialty === "medicine");
    const docIds = medicineDocs.map(d => d.id);
    appendMessage(
      "bot", 
      "I couldn't identify a specific specialty for those symptoms. For general concerns (fever, cold, blood pressure, fatigue), please check our General Medicine specialist:", 
      null, 
      docIds
    );
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
  
  function analyzeReportAndRespond(fileName) {
    const normalized = fileName.toLowerCase();
    
    const reportKeywords = {
      eye: ["eye", "optom", "vision", "cataract", "glaucoma", "sight", "retina", "blind", "ophthal"],
      pediatric: ["child", "baby", "pediatric", "neonat", "kid", "infant", "childhood"],
      gyne: ["preg", "delivery", "period", "gyne", "gynaec", "ivf", "fertility", "uterus", "ovary", "usg", "obstet"],
      dental: ["dent", "tooth", "teeth", "braces", "aligner", "orthodont", "cavity", "opg"],
      patho: ["blood", "cbc", "biochem", "patho", "thyroid", "lipid", "urine", "hba1c", "serum", "cholesterol", "liver"],
      neuro: ["brain", "neuro", "spine", "mri", "eeg", "stroke", "migraine", "headache"],
      ortho: ["joint", "bone", "fracture", "ortho", "knee", "hip", "ligament", "sprain", "xray", "x-ray"],
      derma: ["skin", "acne", "pimple", "derma", "hair", "scalp", "allergy", "melasma", "eczema"],
      chest: ["chest", "lung", "cough", "asthma", "pulmono", "tb", "copd", "pneumonia", "sputum", "respiratory", "bronch"]
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
        const docIds = matchedDocs.map(d => d.id);
        const specLabel = SPECIALTIES[matchedCategory] || "Specialist";
        appendMessage(
          "bot", 
          `Report Analysis Complete: The document suggests indicators related to ${specLabel}. Based on these findings, I suggest consulting the following doctor(s):`, 
          null, 
          docIds
        );
        return;
      }
    }

    const medicineDocs = DOCTORS.filter(d => d.specialty === "medicine");
    const docIds = medicineDocs.map(d => d.id);
    appendMessage(
      "bot", 
      `Report Analysis Complete: We couldn't classify this report's specific department from the file name. For general medical queries and reviews, I suggest consulting a General Medicine specialist:`, 
      null, 
      docIds
    );
  }

  DOM.chatbotFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/") && file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      showToast("Invalid File", "Please select a valid image or PDF report.", "warning");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(evt) {
      const base64Url = evt.target.result;
      
      let cachedImages = [];
      const stored = sessionStorage.getItem("magnum_session_images");
      if (stored) {
        cachedImages = JSON.parse(stored);
      }
      cachedImages.push(base64Url);
      sessionStorage.setItem("magnum_session_images", JSON.stringify(cachedImages));
      
      appendMessage("user", file.name, base64Url);
      
      appendMessage("bot", `Analyzing report (${file.name})... Please wait.`);
      
      setTimeout(() => {
        State.chatHistory = State.chatHistory.filter(msg => !msg.text.startsWith("Analyzing report"));
        localStorage.setItem("magnum_chat_history", JSON.stringify(State.chatHistory));
        renderChatHistory();
        
        analyzeReportAndRespond(file.name);
      }, 2000);
    };
    reader.readAsDataURL(file);
    DOM.chatbotFileInput.value = "";
  });
});
