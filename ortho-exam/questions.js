window.QUESTIONS = [

  // ── TRAUMA ──────────────────────────────────────────────────────────────────

  {
    id: 1,
    subspecialty: "Trauma",
    questionType: "Classification",
    stem: "A 28-year-old male is brought to the ED after a high-speed motor vehicle collision. Pelvic X-ray shows widening of the pubic symphysis >2.5 cm with widening of the right sacroiliac joint. The patient is hemodynamically unstable despite 2 L IV crystalloid. CT angiography demonstrates active arterial extravasation from the right internal iliac artery.\n\nWhich Tile/Young-Burgess classification best describes this injury?",
    choices: {
      A: "Tile A — stable pelvic ring injury with no significant ligamentous disruption",
      B: "APC-I — symphysis diastasis <2.5 cm, anterior sacroiliac ligaments intact",
      C: "APC-II — anterior SI joint disruption with posterior SI ligaments intact",
      D: "APC-III — complete disruption of anterior and posterior SI ligaments, rotationally and vertically unstable",
      E: "LC-III — ipsilateral internal rotation with contralateral external rotation (windswept pelvis)"
    },
    correct: "D",
    explanation: "APC-III (equivalent to Tile C) involves complete disruption of the anterior and posterior sacroiliac, sacrospinous, and sacrotuberous ligaments, creating a rotationally and vertically unstable hemipelvis. Symphysis diastasis >2.5 cm with SI joint widening confirms complete posterior ligamentous failure — the pattern that carries the highest risk of massive retroperitoneal hemorrhage. Per Rockwood & Green's Fractures in Adults, immediate pelvic binder or external fixation followed by angioembolization is the standard of care."
  },

  {
    id: 2,
    subspecialty: "Trauma",
    questionType: "Management",
    stem: "A 52-year-old female sustains a displaced, comminuted intertrochanteric hip fracture after a fall. Preoperative AP radiograph shows the fracture extends from the greater trochanter to the lesser trochanter with a posteromedial spike. The measured lateral wall thickness is 18 mm.\n\nWhich implant construct offers the most biomechanically reliable fixation for this fracture?",
    choices: {
      A: "Dynamic hip screw (DHS) with a 4-hole side plate",
      B: "DHS with a trochanteric stabilization plate",
      C: "Cephalomedullary nail (long)",
      D: "Cannulated screws in a triangular configuration",
      E: "Total hip arthroplasty"
    },
    correct: "C",
    explanation: "A lateral wall thickness <20.5 mm on the preoperative AP radiograph predicts lateral wall fracture after DHS fixation, which leads to mechanical failure. Cephalomedullary nailing provides superior stability for unstable intertrochanteric patterns (OTA/AO 31-A2/A3) by converting the bending moment to an intramedullary construct and maintaining the lateral wall. Campbell's Operative Orthopaedics identifies lateral wall integrity as the key determinant of implant selection; long nails are preferred when subtrochanteric extension is present."
  },

  {
    id: 3,
    subspecialty: "Trauma",
    questionType: "Complication",
    stem: "A 23-year-old male sustains a closed tibial shaft fracture treated with intramedullary nailing. Twelve hours postoperatively he complains of escalating pain, especially with passive dorsiflexion and toe extension. Compartment pressure is measured at 38 mmHg; his diastolic blood pressure is 70 mmHg.\n\nWhich statement is correct regarding the threshold for fasciotomy in this scenario?",
    choices: {
      A: "Fasciotomy is indicated only when absolute compartment pressure exceeds 40 mmHg",
      B: "Fasciotomy is indicated when delta pressure (diastolic BP − compartment pressure) is <30 mmHg",
      C: "Fasciotomy is contraindicated after intramedullary nailing",
      D: "The threshold for fasciotomy should be raised to 50 mmHg in athletes with higher baseline muscle pressure",
      E: "Fasciotomy is indicated only in unconscious or obtunded patients"
    },
    correct: "B",
    explanation: "The delta pressure threshold — diastolic blood pressure minus compartment pressure <30 mmHg — is the most clinically validated criterion for fasciotomy, as established by Whitesides and confirmed in Rockwood & Green's. Here, delta pressure = 70 − 38 = 32 mmHg, which is borderline; combined with pain on passive stretch, fasciotomy is indicated. Relying solely on an absolute pressure of 40 mmHg ignores the patient's systemic perfusion and may delay treatment in hypotensive patients."
  },

  // ── SPINE ────────────────────────────────────────────────────────────────────

  {
    id: 4,
    subspecialty: "Spine",
    questionType: "Diagnosis",
    stem: "A 67-year-old female presents with a 6-month history of bilateral buttock and thigh pain that worsens with walking and is relieved by sitting or leaning forward on a shopping cart. She has no bowel or bladder dysfunction. MRI lumbar spine shows L4-L5 degenerative spondylolisthesis (Grade I) with severe bilateral foraminal and central canal stenosis. Ankle-brachial index is 1.1 bilaterally.\n\nWhat is the most likely diagnosis?",
    choices: {
      A: "Vascular claudication from peripheral arterial disease",
      B: "Hip osteoarthritis with referred thigh pain",
      C: "Neurogenic claudication from lumbar spinal stenosis",
      D: "Lumbar facet arthropathy",
      E: "L4 radiculopathy from an acute disc herniation"
    },
    correct: "C",
    explanation: "Neurogenic claudication is characterized by bilateral lower extremity pain, heaviness, or paresthesias worsened by walking and relieved by lumbar flexion (sitting, shopping cart sign). An ABI of 1.1 effectively excludes peripheral vascular disease (ABI <0.9 is abnormal). The MRI confirming L4-L5 degenerative spondylolisthesis with severe central stenosis is the anatomical correlate. Campbell's Operative Orthopaedics notes that lumbar flexion transiently increases canal diameter, explaining positional symptom relief."
  },

  {
    id: 5,
    subspecialty: "Spine",
    questionType: "Management",
    stem: "A 35-year-old male construction worker presents with acute onset severe low back and left leg pain radiating to the lateral foot and small toe after lifting. MRI shows a large L5-S1 posterolateral disc herniation with severe S1 nerve root compression. Motor examination reveals 4/5 plantar flexion weakness and absent Achilles reflex on the left. He has undergone 6 weeks of conservative treatment without improvement.\n\nWhat is the most appropriate next step?",
    choices: {
      A: "Epidural steroid injection",
      B: "Continue conservative therapy for 6 additional weeks",
      C: "Lumbar microdiscectomy",
      D: "L5-S1 total disc replacement",
      E: "L5-S1 posterolateral fusion with pedicle screws"
    },
    correct: "C",
    explanation: "After 6 weeks of failed conservative therapy with progressive neurological deficit (motor weakness, absent reflex), surgical decompression is indicated. Lumbar microdiscectomy is the established gold standard for symptomatic lumbar disc herniation failing conservative management, supported by multiple RCTs including the SPORT trial. Fusion is not indicated for isolated disc herniation without instability. Total disc replacement at L5-S1 is considered for discogenic axial pain, not acute radiculopathy with a compressive mass lesion."
  },

  {
    id: 6,
    subspecialty: "Spine",
    questionType: "Complication",
    stem: "A 58-year-old female undergoes anterior cervical discectomy and fusion (ACDF) at C5-C6 for cervical myelopathy via a left-sided approach. On postoperative day 1, she develops hoarseness, a breathy voice, and difficulty swallowing. Examination shows an absent gag reflex on the left side.\n\nWhat is the most likely cause of these findings?",
    choices: {
      A: "Recurrent laryngeal nerve injury",
      B: "Esophageal perforation with mediastinitis",
      C: "Horner syndrome from sympathetic chain injury",
      D: "Hypoglossal nerve (CN XII) injury",
      E: "Postoperative epidural hematoma causing cord compression"
    },
    correct: "A",
    explanation: "Recurrent laryngeal nerve (RLN) injury is the most common nerve complication of ACDF, occurring in 1–2% of cases. It presents with hoarseness, breathy voice, and dysphagia. Horner syndrome (ptosis, miosis, anhidrosis) would indicate sympathetic chain injury. Postoperative hematoma presents with dyspnea, stridor, and expanding neck swelling requiring urgent re-exploration. Campbell's notes that the right RLN has a more variable and lateral course, making right-sided approaches potentially higher risk; however, the left RLN's longer loop around the aortic arch makes it vulnerable during left-sided dissection."
  },

  // ── SPORTS MEDICINE ──────────────────────────────────────────────────────────

  {
    id: 7,
    subspecialty: "Sports Medicine",
    questionType: "Diagnosis",
    stem: "A 19-year-old female soccer player reports a \"pop\" in her right knee after a non-contact plant-and-cut maneuver. Significant effusion develops within 2 hours. On examination there is a positive Lachman test with a soft endpoint and a positive anterior drawer. MRI confirms a complete ACL tear with a bone bruise at the lateral femoral condyle and posterior lateral tibial plateau.\n\nWhat is the pathophysiological mechanism of this characteristic bone bruise pattern?",
    choices: {
      A: "Direct valgus contact force transmitted to the lateral compartment",
      B: "Pivot-shift impaction of the lateral femoral condyle against the posterolateral tibial plateau at the moment of ACL rupture",
      C: "Chronic repetitive stress reaction from lateral compartment overloading",
      D: "Avascular necrosis of the lateral femoral condyle from vascular injury",
      E: "Insufficiency fracture from underlying metabolic bone disease"
    },
    correct: "B",
    explanation: "The 'kissing contusions' — bone bruises at the lateral femoral condyle and posterolateral tibial plateau — are pathognomonic of ACL rupture and result from the pivot-shift mechanism. At the moment of ACL failure, the tibia subluxes anterolaterally, impacting the posterolateral tibial plateau against the lateral femoral condyle. This pattern is present in >80% of complete ACL tears on MRI, documented in multiple series cited in the IKDC literature and Green's operative techniques. It is not a contact injury mechanism."
  },

  {
    id: 8,
    subspecialty: "Sports Medicine",
    questionType: "Management",
    stem: "A 42-year-old recreational male tennis player undergoes arthroscopic repair of a vertical tear in the posterior horn of the medial meniscus (red-red zone). He is now 6 weeks postoperative.\n\nWhich rehabilitation approach is most appropriate at this stage?",
    choices: {
      A: "Full weight-bearing and immediate return to sport",
      B: "Strict non-weight-bearing for 6 weeks with delayed rehabilitation",
      C: "Partial weight-bearing with the knee braced in extension, gradual range-of-motion advancement beyond 90° deferred to 12 weeks",
      D: "Immediate full range-of-motion exercises without weight-bearing restrictions",
      E: "Continuous passive motion for 8 hours/day without weight-bearing for 8 weeks"
    },
    correct: "C",
    explanation: "Meniscus repair healing requires controlled mechanical loading. Current evidence supports partial weight-bearing in extension (or slight flexion) with a brace for 4–6 weeks, avoiding high flexion angles (>90°) that increase shear stress at the repair site. The vascular red-red zone has the best healing potential; unprotected loading before scar maturation risks re-tear. DeLee, Drez & Miller Orthopaedic Sports Medicine recommends gradual ROM advancement with return to sport no earlier than 4–6 months after repair."
  },

  {
    id: 9,
    subspecialty: "Sports Medicine",
    questionType: "Investigation",
    stem: "A 16-year-old male baseball pitcher reports lateral elbow pain for 3 months, worse with throwing. He has tenderness at the lateral joint line and a −15° extension deficit. Plain radiographs show a loose body in the posterior compartment. MRI reveals a 1.5 cm osteochondral defect of the capitellum with a partially detached fragment and subchondral cyst.\n\nWhat is the most appropriate treatment?",
    choices: {
      A: "Activity restriction and physical therapy for 3 months",
      B: "Arthroscopic loose body removal and debridement only",
      C: "Arthroscopic debridement with microfracture of the capitellar defect",
      D: "Arthroscopic fragment fixation or osteochondral autograft transplantation (OATS)",
      E: "Total elbow arthroplasty"
    },
    correct: "D",
    explanation: "This presentation is consistent with osteochondritis dissecans (OCD) of the capitellum. A partially detached, unstable fragment >1 cm with subchondral cyst in a skeletally mature adolescent requires fixation if the fragment is viable, or osteochondral autograft transplantation if not. Debridement alone leaves a full-thickness defect in a high-load bearing area and produces inferior long-term outcomes. Campbell's Operative Orthopaedics states that stable OCD lesions in young children may heal with activity restriction, but unstable fragments in adolescents require surgical stabilization or reconstruction."
  },

  // ── PEDIATRIC ORTHOPAEDICS ───────────────────────────────────────────────────

  {
    id: 10,
    subspecialty: "Pediatric",
    questionType: "Classification",
    stem: "A 9-year-old girl presents with a 2-week history of left hip pain and limp. She is afebrile. Hip X-ray shows flattening and increased density of the left femoral epiphysis with a crescent sign on the frog-leg lateral view. The lateral pillar of the epiphysis is completely involved with loss of height to less than 50% of the contralateral side.\n\nAccording to the Herring Lateral Pillar classification, which category does this represent, and what is its prognostic significance?",
    choices: {
      A: "Lateral Pillar A — full lateral pillar height maintained; excellent prognosis",
      B: "Lateral Pillar B — >50% of lateral pillar height maintained; intermediate prognosis",
      C: "Lateral Pillar B/C border — narrow lateral pillar with exactly 50% height",
      D: "Lateral Pillar C — <50% or complete loss of lateral pillar height; worst prognosis",
      E: "Catterall Group IV — complete head involvement; treatment by femoral osteotomy"
    },
    correct: "D",
    explanation: "The Herring Lateral Pillar classification grades involvement of the lateral column of the femoral head on AP radiography. Group C, defined as <50% lateral pillar height or complete collapse, carries the worst prognosis with the highest risk of femoral head deformity and subsequent hip dysfunction. Lovell & Winter's Pediatric Orthopaedics identifies lateral pillar classification as the strongest radiographic predictor of outcome in Legg-Calvé-Perthes disease, guiding decisions on containment treatment (bracing vs. osteotomy) especially in children over 8 years of age."
  },

  {
    id: 11,
    subspecialty: "Pediatric",
    questionType: "Management",
    stem: "A 4-year-old male is found to have an irreducible left hip on examination under anesthesia for developmental dysplasia of the hip (DDH). Arthrography shows medial pooling of dye consistent with a limbus infolding, and closed reduction is unsuccessful.\n\nWhat is the most appropriate next step in management?",
    choices: {
      A: "Repeat trial of Pavlik harness for an additional 3 months",
      B: "Hip spica casting in the 'human position' without achieving reduction",
      C: "Open reduction via the medial (Ferguson/Ludloff) approach",
      D: "Open reduction via the anterior (Smith-Petersen) approach with femoral shortening osteotomy",
      E: "Periacetabular osteotomy (PAO) to improve acetabular coverage"
    },
    correct: "D",
    explanation: "When closed reduction fails, open reduction is required. For children over 18–24 months with significant proximal femoral migration, the anterior (Smith-Petersen) approach combined with femoral shortening osteotomy is preferred — femoral shortening decompresses the joint, reduces traction on neurovascular structures, and substantially lowers the risk of avascular necrosis. The medial approach (Ludloff) is appropriate for children under 18 months but does not allow simultaneous acetabular reconstruction. Lovell & Winter's and Campbell's both recommend femoral shortening when significant force is required to reduce the hip."
  },

  {
    id: 12,
    subspecialty: "Pediatric",
    questionType: "Diagnosis",
    stem: "A 13-year-old obese male presents with a 2-month history of right groin and medial thigh pain, worse with activity. He walks with the right foot in external rotation. Hip X-rays (AP and frog-leg lateral) show posterior and inferior displacement of the femoral epiphysis relative to the femoral neck.\n\nWhat is the most important immediate next step in management?",
    choices: {
      A: "MRI of the hip to evaluate for avascular necrosis prior to any intervention",
      B: "Bone scan to assess physeal activity before treatment",
      C: "In situ pinning with a single cannulated screw as soon as possible",
      D: "Hip spica casting and strict non-weight-bearing for 6 weeks",
      E: "Subtrochanteric valgus osteotomy to restore neck-shaft alignment"
    },
    correct: "C",
    explanation: "This is a slipped capital femoral epiphysis (SCFE). In situ fixation with a single centrally placed cannulated screw is the standard of care for stable SCFE and should not be delayed once the diagnosis is confirmed on plain radiographs. Delaying for advanced imaging in a stable SCFE is not warranted and risks progression to an unstable slip. Attempted reduction increases the risk of avascular necrosis; in situ fixation stabilizes the physis without manipulating the head. Campbell's and Lovell & Winter's both classify SCFE as an orthopedic urgency requiring prompt surgical stabilization."
  },

  // ── FOOT AND ANKLE ───────────────────────────────────────────────────────────

  {
    id: 13,
    subspecialty: "Foot & Ankle",
    questionType: "Management",
    stem: "A 55-year-old female with long-standing rheumatoid arthritis presents with severe bilateral forefoot pain and inability to wear standard footwear. Examination shows hallux valgus bilaterally (60° HVA), clawing of all lesser toes, painful plantar callosities under the metatarsal heads, and subluxation of the 2nd–4th MTP joints. She requests surgical correction.\n\nWhat is the most appropriate surgical procedure?",
    choices: {
      A: "First MTP joint arthrodesis alone",
      B: "First MTP arthrodesis combined with lesser metatarsal head resections (Clayton-type procedure)",
      C: "Chevron osteotomy for hallux valgus with lesser toe PIP joint arthrodesis",
      D: "Weil osteotomies of the lesser metatarsals with soft-tissue hallux valgus correction",
      E: "First ray shortening osteotomy only"
    },
    correct: "B",
    explanation: "Rheumatoid forefoot deformity with severe hallux valgus, MTP subluxation, and transfer metatarsalgia is best treated by first MTP arthrodesis combined with resection of the lesser metatarsal heads (Clayton or Stainsby modification). First MTP arthrodesis provides durable correction and eliminates the hallux as a deforming force; lesser metatarsal head resection relieves the metatarsalgia and MTP subluxation. Mann's Surgery of the Foot & Ankle documents the superior durability of first MTP arthrodesis over arthroplasty in rheumatoid patients. Chevron osteotomies are inappropriate for severe deformity (HVA >40°)."
  },

  {
    id: 14,
    subspecialty: "Foot & Ankle",
    questionType: "Classification",
    stem: "A 48-year-old diabetic male with peripheral neuropathy presents with a painless, warm, swollen right foot for 3 weeks. X-rays show fragmentation and collapse of the navicular and medial cuneiforms with lateral subluxation of the midfoot. There is no skin breakdown.\n\nWhat is the correct Eichenholtz stage and Brodsky anatomical type for this presentation?",
    choices: {
      A: "Eichenholtz Stage I (Development/Fragmentation), Brodsky Type 1 (midfoot)",
      B: "Eichenholtz Stage II (Coalescence), Brodsky Type 2 (hindfoot)",
      C: "Eichenholtz Stage III (Reconstruction), Brodsky Type 1",
      D: "Eichenholtz Stage I (Development), Brodsky Type 2 (hindfoot/ankle)",
      E: "Eichenholtz Stage 0 (At Risk), Brodsky Type 3A (ankle)"
    },
    correct: "A",
    explanation: "Eichenholtz Stage I (Development) is characterized by periarticular fractures, joint subluxation, and debris without evidence of healing. Stage II (Coalescence) shows absorption of debris and early periosteal new bone. Stage III (Reconstruction) shows consolidation and remodeling. Brodsky Type 1 — the most common pattern (>60%) — involves the tarsometatarsal and transverse tarsal joints (navicular-cuneiform-metatarsal bases). Total contact casting is the treatment of choice during Stage I to off-load the foot and prevent progressive deformity, as recommended in Mann's Surgery of the Foot & Ankle."
  },

  {
    id: 15,
    subspecialty: "Foot & Ankle",
    questionType: "Diagnosis",
    stem: "A 38-year-old male recreational runner presents with plantar heel pain, worst with the first steps of the morning, for 4 months. Tenderness is maximal at the medial calcaneal tuberosity. Six months of conservative management (stretching, orthotics, NSAIDs) has failed. Ultrasound shows plantar fascia thickening of 6.2 mm (normal <4 mm) with hypoechoic change at the calcaneal insertion.\n\nWhich statement about further non-surgical treatment is most accurate?",
    choices: {
      A: "Extracorporeal shockwave therapy (ESWT) has no evidence base and should not be offered",
      B: "Repeated corticosteroid injections every 3 months provide the most durable long-term relief",
      C: "Extracorporeal shockwave therapy (ESWT) is an effective, evidence-based option for chronic plantar fasciitis refractory to conservative care",
      D: "Platelet-rich plasma (PRP) injection is the FDA-approved first-line non-surgical option",
      E: "MRI is required before any additional treatment can be considered"
    },
    correct: "C",
    explanation: "ESWT has Level I evidence (multiple RCTs) supporting its use for chronic plantar fasciitis refractory to 3–6 months of conservative care. It is included as a moderate-strength recommendation in the AAOS clinical practice guideline and in Mann's Surgery of the Foot & Ankle before surgical plantar fascia release is considered. Repeated corticosteroid injection risks plantar fascia rupture and fat pad atrophy. PRP has promising but heterogeneous evidence and is not FDA-approved for this indication. ESWT should be offered before open or endoscopic fasciotomy is considered."
  },

  // ── HAND SURGERY ─────────────────────────────────────────────────────────────

  {
    id: 16,
    subspecialty: "Hand",
    questionType: "Diagnosis",
    stem: "A 45-year-old male presents with progressive inability to fully extend his ring and small fingers over 2 years. Examination reveals the ring and small finger MCP joints are held in 40° and 55° of flexion, respectively, with palpable firm nodules in the palm along the ring and small finger rays. Passive extension is blocked by palpable taut cords. There is no skin ulceration or triggering.\n\nWhat is the etiology and the pathological tissue involved?",
    choices: {
      A: "Flexor tendon triggering secondary to A1 pulley stenosis",
      B: "Intrinsic muscle contracture — interossei and lumbrical fibrosis",
      C: "Dupuytren disease — myofibroblastic proliferation within the palmar fascia",
      D: "Ulnar nerve palsy producing an intrinsic-minus posture",
      E: "Flexor digitorum superficialis rupture causing a pseudo-boutonniere deformity"
    },
    correct: "C",
    explanation: "Dupuytren disease is a fibroproliferative disorder of the palmar fascia involving myofibroblast proliferation and type III collagen deposition, forming pathological cords and nodules that progressively flex the MCP and PIP joints. The ring and small fingers are most commonly affected. Green's Hand Surgery describes the pretendinous cord (from the pretendinous band) as the cause of MCP flexion contracture, and the spiral cord as the cause of PIP contracture. MCP contractures >30° are generally an indication for treatment (needle aponeurotomy, collagenase injection, or partial fasciectomy). Triggering involves the A1 pulley with a clicking/locking phenomenon, not a progressive passive extension block."
  },

  {
    id: 17,
    subspecialty: "Hand",
    questionType: "Management",
    stem: "A 34-year-old right-handed female presents 8 hours after a complete flexor tendon laceration in Zone II of the right index finger (between the A1 pulley and the FDS insertion). Primary repair is performed that day. You plan to use an early active mobilization protocol postoperatively.\n\nWhich suture repair technique best supports early active mobilization and maximizes repair strength?",
    choices: {
      A: "Simple 2-strand Kessler repair with no epitendinous suture",
      B: "4-strand modified Kessler or cruciate repair plus an epitendinous suture",
      C: "2-strand Bunnell repair without epitendinous suture",
      D: "6-strand core suture (e.g., Lim-Tsai) with circumferential epitendinous suture",
      E: "Figure-of-8 suture with no epitendinous suture"
    },
    correct: "D",
    explanation: "Repair strength is proportional to the number of suture strands crossing the repair site. A minimum of 4 core strands was previously the standard; contemporary early active mobilization protocols require 6-strand core repairs (e.g., Lim-Tsai, Tang) to withstand active flexion forces. Adding a circumferential epitendinous suture contributes an additional 10–50% of tensile strength and smooths the repair to reduce pulley friction. Green's Hand Surgery (7th ed.) documents that 6–8 strand repairs have become the gold standard in hand surgery centers performing early active mobilization. The 2-strand Kessler is insufficient for active motion protocols."
  },

  {
    id: 18,
    subspecialty: "Hand",
    questionType: "Complication",
    stem: "A 28-year-old male undergoes successful replantation of his right thumb at the IP joint level after a circular saw injury. On postoperative day 2, the replanted thumb appears pale and cool (temperature 28°C vs. 34°C on the contralateral thumb). Capillary refill is >3 seconds. Needle-stick of the pulp produces no bleeding.\n\nWhat is the correct diagnosis and most appropriate next step?",
    choices: {
      A: "Venous congestion — apply medicinal leeches and start anticoagulation",
      B: "Arterial insufficiency — return to OR urgently for arterial re-exploration",
      C: "Normal postoperative edema — elevate the hand and observe for 24 hours",
      D: "Wound infection — start IV antibiotics and wound cultures",
      E: "Reperfusion injury — this is expected and will self-resolve"
    },
    correct: "B",
    explanation: "Arterial insufficiency presents with a pale, cool, pulseless digit with absent or very slow capillary refill and no bleeding on needle-stick — in contrast to venous congestion, which produces a purple, turgid part with immediate dark bleeding on needle-stick. Temperature monitoring is the most sensitive continuous monitoring tool; a differential >2°C versus the contralateral digit or an absolute temperature <30°C is an alarming sign requiring urgent return to the OR. Green's Hand Surgery emphasizes that arterial compromise requires urgent thrombectomy and revision of the anastomosis — ideally within 6 hours to maximize salvage."
  },

  // ── MUSCULOSKELETAL ONCOLOGY ─────────────────────────────────────────────────

  {
    id: 19,
    subspecialty: "Tumor",
    questionType: "Diagnosis",
    stem: "A 15-year-old male presents with a 3-month history of progressively worsening right distal femur pain and swelling. Night pain is present. ESR is 62 mm/hr. Plain X-ray shows a permeative lesion at the distal femoral metaphysis with cortical destruction, a Codman triangle, and a 'sunburst' pattern of periosteal new bone formation.\n\nWhat is the most likely diagnosis?",
    choices: {
      A: "Ewing sarcoma",
      B: "Conventional intramedullary osteosarcoma",
      C: "Giant cell tumor of bone",
      D: "Aneurysmal bone cyst",
      E: "Central chondrosarcoma"
    },
    correct: "B",
    explanation: "Conventional osteosarcoma is the most common primary malignant bone tumor in adolescents and young adults, with a predilection for the distal femoral metaphysis. The radiographic triad of permeative destruction, Codman triangle (periosteal elevation), and sunburst periosteal reaction is pathognomonic. Ewing sarcoma also occurs in this age group but typically shows an 'onion-skin' periosteal reaction and is more diaphyseal. Giant cell tumor occurs in skeletally mature patients and is epiphyseal. Per Campbell's and the Enneking staging system, whole-body bone scan, CT chest, and MRI of the entire bone are mandatory before biopsy."
  },

  {
    id: 20,
    subspecialty: "Tumor",
    questionType: "Management",
    stem: "A 42-year-old female is diagnosed with a grade 2 chondrosarcoma of the proximal humerus (Enneking Stage IIA). MRI shows the tumor is confined within the bone with an intact cortex and no skip lesions. CT chest is negative for pulmonary metastases.\n\nWhat is the most appropriate treatment?",
    choices: {
      A: "Chemotherapy alone (chondrosarcoma is chemosensitive)",
      B: "Radiation therapy alone",
      C: "Wide surgical resection (limb salvage or amputation) achieving >2 cm margins",
      D: "Intralesional curettage with adjuvant phenol and bone graft",
      E: "Observation with repeat MRI in 6 months"
    },
    correct: "C",
    explanation: "Chondrosarcoma is largely resistant to both chemotherapy and radiation therapy, making surgery with wide margins the only curative treatment. Enneking Stage IIA (low-to-intermediate grade, intracompartmental) requires en bloc resection with clear margins (≥2 cm or through a fascial plane). For the proximal humerus, limb salvage with endoprosthetic reconstruction is achievable in the majority of cases. Intralesional curettage is appropriate for benign cartilage lesions (enchondroma) but risks local recurrence and potential dedifferentiation for true chondrosarcoma. Campbell's identifies margin quality as the strongest predictor of local recurrence-free survival."
  },

  {
    id: 21,
    subspecialty: "Tumor",
    questionType: "Investigation",
    stem: "A 65-year-old male with known prostate cancer presents with a new painful lesion in the right femoral subtrochanteric region. X-ray shows a mixed lytic/blastic lesion with cortical thinning. Calculated Mirels score is 9. Technetium-99m bone scan shows uptake at multiple additional skeletal sites.\n\nWhat is the most appropriate next step?",
    choices: {
      A: "Analgesics and repeat X-ray in 3 months",
      B: "External beam radiation to the femur alone",
      C: "Core needle biopsy to confirm metastatic disease, then prophylactic intramedullary fixation",
      D: "Prophylactic intramedullary nailing without tissue biopsy",
      E: "Bisphosphonate therapy and close observation"
    },
    correct: "C",
    explanation: "A Mirels score ≥9 predicts >33% risk of pathological fracture, making prophylactic fixation the standard recommendation. However, tissue biopsy at the time of fixation (or prior) is essential even with a known primary, because a 'solitary bone metastasis' may represent a second primary tumor or sarcomatous transformation, and intramedullary nailing of an unrecognized sarcoma violates surgical planes and can preclude limb salvage. Campbell's Operative Orthopaedics emphasizes that the histological diagnosis must be confirmed before definitive surgical management of any bone lesion."
  },

  // ── ARTHROPLASTY ─────────────────────────────────────────────────────────────

  {
    id: 22,
    subspecialty: "Arthroplasty",
    questionType: "Complication",
    stem: "A 72-year-old male who underwent primary right total hip arthroplasty 8 years ago presents with 6 months of groin pain and progressive loosening on serial radiographs. WBC, ESR, and CRP are normal. Hip aspiration shows 800 cells/mm³ with 60% PMN. Alpha-defensin is NEGATIVE; leukocyte esterase strip is NEGATIVE. X-ray shows a continuous radiolucent line around the acetabular component with osteolysis.\n\nWhat is the most likely diagnosis?",
    choices: {
      A: "Periprosthetic joint infection (PJI) — two-stage revision indicated",
      B: "Aseptic loosening with polyethylene wear-induced osteolysis",
      C: "Adverse local tissue reaction (ALTR) from metal-on-metal bearing surface",
      D: "Fatigue fracture of the femoral stem",
      E: "Trunnion corrosion with metallosis"
    },
    correct: "B",
    explanation: "The synovial fluid analysis is well below the MSIS threshold for hip PJI (>3,000 WBC/mm³ or >80% PMN), and both alpha-defensin and leukocyte esterase are negative, effectively ruling out infection. Continuous radiolucency around the acetabular component with osteolysis is the classic radiographic pattern of aseptic loosening driven by polyethylene wear debris. Macrophage-mediated response to polyethylene particles causes periprosthetic bone resorption. Per Campbell's, minimal osteolysis may be monitored closely; progressive loosening with component migration requires revision arthroplasty with bone grafting."
  },

  {
    id: 23,
    subspecialty: "Arthroplasty",
    questionType: "Management",
    stem: "A 68-year-old female presents 3 weeks after an uncomplicated left total knee arthroplasty (TKA) with acute onset severe knee pain, swelling, and fever (38.8°C). Lab results: ESR 98 mm/hr, CRP 142 mg/L. Knee aspiration yields cloudy fluid: WBC 58,000/mm³ (93% PMN), positive leukocyte esterase. Gram stain shows gram-positive cocci in clusters. The wound is intact with no drainage. Fluoroscopy confirms both components are well-fixed.\n\nWhat is the optimal surgical management?",
    choices: {
      A: "IV antibiotics alone for 6 weeks with close outpatient follow-up",
      B: "Aspiration and irrigation under ultrasound guidance only",
      C: "Single-stage revision TKA immediately",
      D: "DAIR (debridement, antibiotics, and implant retention) with polyethylene liner exchange",
      E: "Two-stage revision: explantation with antibiotic spacer placement, then delayed reimplantation"
    },
    correct: "D",
    explanation: "Acute periprosthetic joint infection within 3 weeks of index arthroplasty with well-fixed implants meets MSIS criteria for DAIR candidacy. When implants are well-fixed and infection is acute (<4 weeks), DAIR with modular polyethylene exchange plus targeted IV antibiotics achieves infection eradication in 60–80% of appropriately selected cases. Two-stage revision is reserved for chronic infection, resistant organisms, or failed DAIR. Campbell's and the MSIS/Parvizi guidelines support DAIR with modular exchange as the primary approach for acute postoperative PJI with stable implants."
  },

  {
    id: 24,
    subspecialty: "Arthroplasty",
    questionType: "Classification",
    stem: "A 70-year-old male fell 2 years after a right total knee arthroplasty. X-rays show a comminuted periprosthetic distal femur fracture originating 3 cm above the distal femoral component. Fluoroscopy confirms the femoral component is well-fixed with no radiolucent lines. Bone quality is poor (Dorr Type C).\n\nUsing the Rorabeck-Taylor classification, which fracture type is this, and what treatment is indicated?",
    choices: {
      A: "Type I — non-displaced, stable implant — conservative management in a hinged knee brace",
      B: "Type II — displaced, stable implant — ORIF (locking plate or retrograde IM nail)",
      C: "Type III — any fracture with a loose implant — revision arthroplasty with distal femoral replacement",
      D: "Type II — displaced, stable implant — primary distal femoral replacement due to poor bone quality",
      E: "Type I — non-displaced, loose implant — revision arthroplasty"
    },
    correct: "B",
    explanation: "The Rorabeck-Taylor classification: Type I = non-displaced, stable implant; Type II = displaced (>5 mm or >5° angulation), stable implant; Type III = fracture with a loose or failing implant. This case is Type II — comminuted displaced fracture with a well-fixed component — treated by ORIF with a locking distal femoral plate or retrograde intramedullary nail (if box geometry allows). Revision to distal femoral replacement (DFR) is reserved for Type III or failed ORIF. While poor bone quality increases ORIF complexity, it does not by itself mandate arthroplasty revision. Per Campbell's, DFR is a backup for Type II with irreconstruable bone loss."
  },

  // ── METABOLIC BONE DISEASE ───────────────────────────────────────────────────

  {
    id: 25,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Diagnosis",
    stem: "A 64-year-old postmenopausal female is referred after sustaining a low-energy vertebral compression fracture. DEXA: T-score −2.7 at lumbar spine, −2.4 at femoral neck. Labs: serum calcium 9.2 mg/dL, phosphate 3.4 mg/dL, PTH 12 pg/mL (normal 15–65 pg/mL), 25-OH vitamin D 16 ng/mL (normal >30 ng/mL). Urine calcium 580 mg/24h (elevated).\n\nWhat is the most likely diagnosis explaining the fragility fracture?",
    choices: {
      A: "Primary hyperparathyroidism",
      B: "Postmenopausal osteoporosis with vitamin D deficiency",
      C: "Hypoparathyroidism with hypocalciuria",
      D: "Paget disease of bone",
      E: "Renal osteodystrophy"
    },
    correct: "B",
    explanation: "The T-score ≤−2.5 confirms osteoporosis, and the severely low 25-OH vitamin D (16 ng/mL) indicates clinically significant vitamin D deficiency. The low-normal PTH reflects physiological suppression (not hypoparathyroidism) in a patient with near-normal calcium. Elevated urine calcium reflects increased bone resorption from estrogen deficiency and inadequate calcium-vitamin D homeostasis. Primary hyperparathyroidism would show hypercalcemia with elevated PTH. Campbell's emphasizes that all osteoporosis patients must be screened for vitamin D deficiency, which independently impairs bone mineralization and fracture healing."
  },

  {
    id: 26,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Management",
    stem: "A 70-year-old male sustained a low-energy femoral neck fracture 3 years ago and was started on alendronate for DEXA-confirmed osteoporosis. He now presents with new anterior thigh pain. X-ray shows a transverse subtrochanteric fracture with a medial cortical 'beak,' diffuse lateral cortical thickening, and a periosteal stress reaction. The contralateral femur shows similar cortical thickening on X-ray.\n\nWhat is the most likely diagnosis and the recommended treatment?",
    choices: {
      A: "Metastatic lesion — CT-guided biopsy before any intervention",
      B: "Atypical femoral fracture (AFF) from long-term bisphosphonate use — surgical fixation and drug holiday",
      C: "Stress fracture from overuse — activity restriction and bone stimulator",
      D: "Paget disease of bone — calcitonin therapy",
      E: "Osteomalacia — vitamin D supplementation only"
    },
    correct: "B",
    explanation: "Atypical femoral fractures (AFF) are a recognized complication of long-term bisphosphonate therapy (>3–5 years), caused by suppression of bone remodeling that impairs fatigue fracture repair. Pathognomonic radiographic features include a transverse or short oblique subtrochanteric orientation, medial cortical spike (beak), lateral cortical thickening, and minimal comminution. The ASBMR and AAOS recommend surgical fixation (prophylactic cephalomedullary nailing for impending or complete AFF) and bisphosphonate drug holiday. Contralateral involvement occurs in 28–47% of cases; prophylactic assessment and nailing of the contralateral femur should be considered."
  },

  {
    id: 27,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Investigation",
    stem: "A 55-year-old male presents with diffuse bone pain, proximal muscle weakness, and a waddling gait. Lab results: serum calcium 8.0 mg/dL (low normal), phosphate 1.8 mg/dL (low), alkaline phosphatase 420 U/L (elevated), PTH 88 pg/mL (elevated), 25-OH vitamin D 8 ng/mL (severely low). Bone biopsy shows widened osteoid seams with impaired mineralization front on tetracycline double-label.\n\nWhat is the most accurate diagnosis?",
    choices: {
      A: "Osteoporosis",
      B: "Primary hyperparathyroidism",
      C: "Osteomalacia",
      D: "Paget disease of bone",
      E: "Multiple myeloma"
    },
    correct: "C",
    explanation: "Osteomalacia is defective bone mineralization — osteoid matrix is deposited normally but calcium hydroxyapatite crystal deposition is impaired, resulting in excess unmineralized osteoid. The biochemical profile — low phosphate, low-normal calcium, markedly elevated ALP, secondary hyperparathyroidism (elevated PTH from hypocalcemia), and severely deficient vitamin D — is diagnostic. Bone biopsy confirming widened osteoid seams and impaired mineralization front on tetracycline double-labeling is the gold standard. Campbell's distinguishes osteomalacia from osteoporosis: in osteomalacia, bone mass may be preserved but mineralization is defective; treatment is high-dose vitamin D (ergocalciferol) plus calcium supplementation."
  },

  // ── BASIC SCIENCE ─────────────────────────────────────────────────────────────

  {
    id: 28,
    subspecialty: "Basic Science",
    questionType: "Interpretation",
    stem: "A 32-year-old male undergoes ACL reconstruction with a bone-patellar tendon-bone (BPTB) autograft. The bone plugs are secured in the tibial and femoral tunnels with interference screws. At 6-week postoperative follow-up, which biological process primarily accounts for the integration of the bone plug within the tibial tunnel?",
    choices: {
      A: "Fibrocartilaginous scar filling the gap between plug and tunnel wall",
      B: "Primary bone healing via direct Haversian remodeling without callus formation",
      C: "Endochondral ossification originating from the tunnel cortex",
      D: "Direct bone-to-bone healing with bridging woven bone, followed by remodeling to lamellar bone",
      E: "Ligamentization through vascular ingrowth and collagen fiber remodeling"
    },
    correct: "D",
    explanation: "Bone-plug integration in BPTB ACL reconstruction proceeds by direct bone-to-bone healing: woven bone bridges the gap between the plug and tunnel wall within 3–6 weeks, followed by progressive remodeling to lamellar bone via Haversian remodeling over 6–12 months — mechanistically identical to fracture healing in a low-strain environment. In contrast, the intra-articular graft mid-substance undergoes ligamentization — a separate process of revascularization, cell repopulation, and collagen remodeling taking 12–24 months. These two healing processes occur simultaneously but involve different biological mechanisms, as described in Campbell's Basic Science chapter and the Rodeo tendon-to-bone healing literature."
  },

  {
    id: 29,
    subspecialty: "Basic Science",
    questionType: "Diagnosis",
    stem: "A researcher is characterizing the mechanical behavior of the medial collateral ligament. When plotting a tensile stress-strain curve, an initial non-linear 'toe region' is observed before the linear elastic region and eventual failure. A medical student asks what structural feature of ligament tissue produces this toe region.\n\nWhat is the correct explanation?",
    choices: {
      A: "Plastic deformation of collagen cross-links at low loads",
      B: "Initial recoil of elastin fibers before collagen fibers begin to bear load",
      C: "Progressive straightening (uncrimping) of the naturally wavy collagen fiber crimp pattern",
      D: "Elongation of the fibrocartilaginous enthesis at the ligament insertion",
      E: "Interstitial fluid extrusion from the matrix under compressive load"
    },
    correct: "C",
    explanation: "Native ligament collagen fibers exist in a crimped (wavy) configuration at rest. In the toe region of the stress-strain curve, applied tensile load causes progressive uncrimping (straightening) of these collagen fibrils with very little resistance, producing the characteristic non-linear low-stiffness initial phase. Once all fibers are fully recruited (straightened), the ligament enters the linear region where stiffness increases substantially. This crimp-uncrimp mechanism provides a viscoelastic buffer that protects against sudden impact loads, as fully described in the Noyes biomechanics literature and Campbell's Basic Science section."
  },

  {
    id: 30,
    subspecialty: "Basic Science",
    questionType: "Classification",
    stem: "A 40-year-old male sustains a closed crush injury to the right index finger. He cannot actively extend the DIP joint, and there is a 30° resting flexion deformity. Plain X-rays are normal — no bony avulsion fragment. The mechanism and findings are consistent with disruption of the terminal extensor tendon at the DIP joint level.\n\nWhich Verdan zone does this injury involve, and what is the most appropriate initial treatment?",
    choices: {
      A: "Zone I — surgical primary repair with a pull-out suture is required",
      B: "Zone I — continuous splinting of the DIP joint in full extension for 6–8 weeks",
      C: "Zone II — surgical repair of the central slip is required",
      D: "Zone III — buddy taping to the adjacent finger is sufficient",
      E: "Zone V — ORIF of the associated metacarpal head fracture"
    },
    correct: "B",
    explanation: "Verdan Zone I of the extensor tendon spans from the distal phalanx to the DIP joint, including the terminal extensor mechanism (mallet finger). Closed mallet finger without a large bony avulsion fragment is treated non-operatively with continuous full-extension DIP splinting for 6–8 weeks (with the PIP joint left free), followed by nighttime splinting for 4–6 additional weeks. Surgical repair is reserved for open injuries, large bony avulsions (>30% articular surface with joint subluxation), or failed conservative management. Green's Hand Surgery and the AAOS clinical practice guidelines confirm that continuous splinting achieves outcomes equivalent to surgery for closed Zone I injuries when the patient is compliant."
  }

];
