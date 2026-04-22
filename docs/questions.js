window.QUESTIONS = [

  // ── TRAUMA ──────────────────────────────────────────────────────────────────

  {
    id: 1,
    subspecialty: "Trauma",
    questionType: "Classification",
    stem: "A 35-year-old male is brought to the emergency department following a high-energy motor vehicle collision. He is hemodynamically unstable. An AP pelvis radiograph is shown. The pubic symphysis is widened to approximately 4 cm, and the right sacroiliac joint is splayed open. The left SI joint appears normal.\n\nWhich Young-Burgess classification best describes this injury pattern, and what is the most appropriate initial intervention?",
    imageFile: "q01_pelvis_apc3.svg",
    imageCaption: "AP Pelvis Radiograph",
    choices: {
      A: "APC-I — symphysis diastasis <2.5 cm; managed with protected weight-bearing",
      B: "APC-II — anterior SI disruption, posterior ligaments intact; anterior external fixator alone",
      C: "LC-I — lateral compression with ipsilateral sacral impaction; non-operative management",
      D: "APC-III — complete anterior and posterior SI ligament disruption, rotationally and vertically unstable; pelvic binder then posterior SI fixation",
      E: "Vertical shear — vertical displacement of hemipelvis; traction then combined anterior-posterior fixation"
    },
    correct: "D",
    explanation: "APC-III injury shows symphysis diastasis >2.5 cm AND unilateral SI joint widening with disruption of both anterior and posterior SI ligaments (sacrospinous and sacrotuberous), producing a rotationally and vertically unstable hemipelvis. It carries the highest hemorrhage risk among pelvic ring injuries. Initial management is pelvic binder application (or external fixator) to reduce pelvic volume and tamponade bleeding, followed by angioembolization if active bleeding persists, and definitive posterior SI fixation. (Rockwood & Green's Fractures in Adults, 9th ed.; Young-Burgess Classification)"
  },

  {
    id: 2,
    subspecialty: "Trauma",
    questionType: "Classification",
    stem: "A 52-year-old woman is involved in a high-speed motor vehicle accident and sustains a complex knee injury. On examination, gross swelling, fracture blisters, and a tense hemarthrosis are present. The AP knee radiograph is shown. Both tibial condyles are fractured and the metaphysis is completely separated from the diaphysis.\n\nWhat is the Schatzker classification, and what is the most appropriate initial management?",
    imageFile: "q02_tibial_plateau.svg",
    imageCaption: "AP Knee Radiograph",
    choices: {
      A: "Schatzker IV — medial plateau split; immediate ORIF with buttress plate",
      B: "Schatzker V — bicondylar fracture without metaphyseal dissociation; immediate dual-plating ORIF",
      C: "Schatzker VI — bicondylar with metaphyseal-diaphyseal dissociation; immediate ORIF with dual plates",
      D: "Schatzker VI — bicondylar with metaphyseal-diaphyseal dissociation; staged: temporary spanning external fixator first, then ORIF after 7–14 days",
      E: "Schatzker III — pure central depression; arthroscopic-assisted ORIF"
    },
    correct: "D",
    explanation: "Schatzker VI defines bicondylar tibial plateau fracture with complete metaphyseal-diaphyseal dissociation, typically from high-energy mechanisms. Significant soft-tissue injury (fracture blisters, swelling) mandates staged management: temporary spanning external fixator across the knee restores length and alignment while protecting the soft tissue envelope. Definitive ORIF (dual-incision: anterolateral + posteromedial) is performed after 7–14 days when blisters have epithelialized and swelling has subsided. Immediate plating in this setting carries a wound complication rate exceeding 30%. (Rockwood & Green's Fractures in Adults; Marsh JL et al.)"
  },

  {
    id: 3,
    subspecialty: "Trauma",
    questionType: "Management",
    stem: "A 28-year-old male sustains a knee dislocation in a motorcycle accident that spontaneously reduces before arrival. Physical examination reveals a cool, pale foot with an absent dorsalis pedis pulse. The ankle-brachial index (ABI) is measured at 0.72 on the injured limb.\n\nWhat is the most appropriate next step in management?",
    choices: {
      A: "Serial clinical examination over 6 hours; proceed to the operating room only if ischemia worsens",
      B: "Immediate operative exploration of the popliteal artery without prior imaging",
      C: "CT angiography of the popliteal vessels as the next step",
      D: "Duplex ultrasound followed by formal arteriography in the fluoroscopy suite",
      E: "Immediate application of knee splint in 20° flexion and admit for observation"
    },
    correct: "C",
    explanation: "An ABI <0.9 after knee dislocation is a 'soft sign' of vascular injury mandating urgent vascular imaging. CT angiography (CTA) is the investigation of choice — it is rapid, non-invasive, and accurately identifies popliteal artery injury (occlusion, intimal tear, pseudoaneurysm). 'Hard signs' (absent pulse, expanding hematoma, pulsatile bleeding, bruit/thrill, distal ischemia) warrant immediate operative exploration without prior imaging. ABI <0.65 with hard signs warrants direct OR without CTA. Serial examination alone is unacceptable when ABI <0.9 because intimal tears can progress to thrombosis within hours. (Rockwood & Green's; Mills et al., J Vasc Surg)"
  },

  // ── SPINE ────────────────────────────────────────────────────────────────────

  {
    id: 4,
    subspecialty: "Spine",
    questionType: "Management",
    stem: "A 68-year-old man with a 20-year history of ankylosing spondylitis falls from standing height. He presents with severe mid-lumbar pain and progressive bilateral lower extremity weakness (MRC grade 3/5 bilaterally). CT shows a hyperextension fracture-dislocation through the L2-L3 disc space with disruption of all three columns and 5 mm posterior translation. MRI confirms cord compression at this level. The lateral lumbar spine radiograph is shown.\n\nWhich management strategy is most appropriate?",
    imageFile: "q04_as_spine.svg",
    imageCaption: "Lateral Lumbar Spine Radiograph",
    choices: {
      A: "Thoracolumbosacral orthosis (TLSO) brace for 12 weeks with strict bed rest",
      B: "Short-segment (1 level above, 1 below) posterior pedicle screw fixation",
      C: "Long-segment posterior spinal instrumentation spanning ≥3 levels above and below the fracture",
      D: "Anterior-only L2 corpectomy and cage reconstruction",
      E: "Halo-vest immobilization for 12 weeks followed by reassessment"
    },
    correct: "C",
    explanation: "Ankylosing spondylitis transforms the spine into a rigid 'long bone' — even minor trauma produces inherently unstable 3-column fractures. The fused posterior elements, osteoporotic bone, and long lever arms cause short-segment constructs to fail at very high rates. Long-segment posterior instrumentation spanning ≥3 levels above and below is required to distribute forces adequately. In cases with significant anterior column deficiency, supplemental anterior cage reconstruction may be added. Conservative management is contraindicated in 3-column injuries with neurological deficit — progressive displacement and complete cord injury are expected without stabilization. (Campbell's Operative Orthopaedics, 14th ed.; Caron et al.)"
  },

  {
    id: 5,
    subspecialty: "Spine",
    questionType: "Complication",
    stem: "A 45-year-old woman undergoes anterior cervical discectomy and fusion (ACDF) at C5–C6 for unilateral arm radiculopathy. On postoperative day 1, she develops hoarseness and difficulty swallowing solid food. Laryngoscopy confirms ipsilateral vocal cord paralysis in the paramedian position.\n\nWhich structure was most likely injured during surgery?",
    choices: {
      A: "Sympathetic chain at the stellate ganglion, causing Horner syndrome",
      B: "Recurrent laryngeal nerve (RLN) within the tracheoesophageal groove",
      C: "External branch of the superior laryngeal nerve, causing loss of high-pitched phonation",
      D: "Hypoglossal nerve (CN XII) near the hyoid bone",
      E: "Vertebral artery at the C5–C6 foramen transversarium"
    },
    correct: "B",
    explanation: "The recurrent laryngeal nerve is the most commonly injured nerve during ACDF, running in the tracheoesophageal groove. Unilateral RLN injury causes ipsilateral vocal cord paralysis (adducted/paramedian position), presenting as hoarseness and dysphagia. The left RLN has a longer course and is injured more commonly with left-sided approaches; right-sided approaches carry RLN risk due to its more lateral and variable course. The sympathetic chain injury causes Horner syndrome (ptosis, miosis, anhidrosis). The external SLN causes cricothyroid weakness (loss of vocal pitch control) but not paralysis. (Campbell's Operative Orthopaedics; Apfelbaum RI et al.)"
  },

  {
    id: 6,
    subspecialty: "Spine",
    questionType: "Diagnosis",
    stem: "A 67-year-old male presents with bilateral leg pain beginning after walking 200 meters. The pain affects both buttocks and thighs and is completely relieved within 5 minutes of sitting down, but is NOT relieved by simply stopping ambulation while standing upright. Peripheral pulses are present but mildly reduced. ABI is 0.85 bilaterally.\n\nWhich single clinical feature MOST reliably distinguishes neurogenic from vascular claudication in this patient?",
    choices: {
      A: "Bilateral distribution of symptoms",
      B: "Relief of symptoms by sitting rather than by stopping ambulation in the standing position",
      C: "Absence of rest pain at night",
      D: "Mildly reduced peripheral pulses bilaterally",
      E: "Age over 60 years with co-existing cardiovascular risk factors"
    },
    correct: "B",
    explanation: "The defining difference is postural: neurogenic claudication (lumbar spinal stenosis) is relieved by forward flexion (sitting, stooping), which increases the spinal canal cross-sectional area and reduces nerve root compression. Vascular claudication is relieved simply by reducing metabolic demand — stopping ambulation in any position (standing, sitting, lying). A patient who must sit or lean forward to obtain relief has neurogenic origin. Diminished pulses and ABI 0.85 suggest co-existing PAD, but the postural relief pattern is pathognomonic for spinal stenosis. Bilateral symptoms and age are non-discriminating features. (Waddell's The Back Pain Revolution; Campbell's Operative Orthopaedics)"
  },

  // ── SPORTS MEDICINE ──────────────────────────────────────────────────────────

  {
    id: 7,
    subspecialty: "Sports Medicine",
    questionType: "Interpretation",
    stem: "A 22-year-old female with recurrent lateral patellar dislocation presents for surgical planning. The lateral knee radiograph is shown, with measurements performed using the Caton-Deschamps (CD) method. The CD index is calculated as 1.4.\n\nBased on this finding, which surgical procedure combination provides the most appropriate correction of the underlying pathology?",
    imageFile: "q07_patella_alta.svg",
    imageCaption: "Lateral Knee Radiograph with Caton-Deschamps Measurement",
    choices: {
      A: "CD = 1.4 is within normal limits; MPFL reconstruction alone is sufficient",
      B: "CD = 1.4 confirms patella alta; distal tibial tubercle transfer (distalization) combined with MPFL reconstruction",
      C: "CD = 1.4 confirms patella infera; proximal tibial tubercle transfer to restore patellar height",
      D: "CD = 1.4 confirms patella alta; trochleoplasty alone to deepen the trochlear groove",
      E: "CD = 1.4 confirms patella alta; proximal Insall-Salvati modification procedure alone"
    },
    correct: "B",
    explanation: "Normal Caton-Deschamps index is 0.8–1.2; values >1.2 define patella alta. With CD = 1.4, the patella engages the trochlea late in flexion, reducing passive patellar stability. Surgical correction requires: (1) distal tibial tubercle transfer (distalization) to normalize patellar height so the patella engages the trochlear groove earlier in flexion, and (2) MPFL reconstruction to restore the primary medial soft-tissue restraint. Isolated MPFL reconstruction without addressing the alta leads to higher recurrence rates. Trochleoplasty is reserved for severe trochlear dysplasia. (Dejour H et al.; Morin et al.; Campbell's Operative Orthopaedics)"
  },

  {
    id: 8,
    subspecialty: "Sports Medicine",
    questionType: "Management",
    stem: "A 24-year-old male soccer player undergoes knee arthroscopy for an acute twisting injury. A peripheral longitudinal tear of the lateral meniscus is identified in the 'red-red' zone (peripheral vascularized third), measuring 20 mm in length. The tear reduces anatomically and is stable after reduction on probe testing. The ACL is intact.\n\nWhat is the most appropriate management of this meniscal tear?",
    choices: {
      A: "Partial meniscectomy — peripheral tears are technically difficult to repair and have poor outcomes",
      B: "Meniscus repair — the red-red zone has the highest healing potential and repair is strongly indicated",
      C: "Total meniscectomy to prevent future episodes of locking",
      D: "Leave the tear alone and discharge with a rehabilitation program",
      E: "Meniscus allograft transplantation as the primary definitive treatment"
    },
    correct: "B",
    explanation: "Meniscal vascularity determines healing potential: the red-red zone (outer third, adjacent to meniscocapsular junction) has a rich blood supply from the perimeniscal capillary plexus, yielding healing rates of 90–95% with proper repair technique. A reducible, stable, peripheral longitudinal tear in a young active patient should always be repaired to preserve meniscal function and prevent long-term osteoarthritis — particularly in the lateral compartment where total meniscectomy dramatically accelerates cartilage degeneration. Inside-out or all-inside suture repair are both appropriate. (Campbell's Operative Orthopaedics; Henning CE et al.; Cannon & Vittori)"
  },

  {
    id: 9,
    subspecialty: "Sports Medicine",
    questionType: "Diagnosis",
    stem: "A 19-year-old female basketball player sustains a non-contact injury while landing from a jump, with combined knee valgus and internal rotation. She hears a 'pop' and develops immediate hemarthrosis. MRI confirms ACL disruption.\n\nWhich MRI bone bruise pattern is most characteristic of this ACL injury mechanism?",
    choices: {
      A: "Anterior medial femoral condyle and anterior medial tibial plateau",
      B: "Central femoral notch only, without tibial involvement",
      C: "Posterior medial femoral condyle and posterior lateral tibial plateau",
      D: "Posterior lateral femoral condyle and anterior lateral tibial plateau (pivot-shift pattern)",
      E: "Diffuse bone marrow edema throughout the distal femur without focal contusion"
    },
    correct: "D",
    explanation: "The pivot-shift mechanism of ACL injury involves anterior subluxation of the lateral tibial plateau under the lateral femoral condyle. At the moment of ACL failure, impaction occurs between the posterior-lateral femoral condyle and the anterior-lateral tibial plateau, producing the characteristic 'kissing contusion' pattern. This paired bone bruise is present in over 70% of MRI-confirmed ACL tears and is highly specific for the pivot-shift mechanism. Recognition of this pattern confirms the diagnosis and implies significant rotational instability. The medial compartment is typically unaffected unless a medial collateral injury co-exists. (DeLee & Drez's Orthopaedic Sports Medicine; Kaplan PA et al.)"
  },

  // ── PEDIATRIC ORTHOPAEDICS ───────────────────────────────────────────────────

  {
    id: 10,
    subspecialty: "Pediatric",
    questionType: "Diagnosis",
    stem: "A 12-year-old male with end-stage renal disease (ESRD) on hemodialysis presents with bilateral hip pain and a waddling gait for 3 weeks. He is at the 50th percentile for height and weight (not obese). Serum PTH is markedly elevated at 1,850 pg/mL (normal <65). AP pelvis radiograph is shown.\n\nWhat is the most likely diagnosis, and what is the predisposing pathophysiological mechanism?",
    imageFile: "q10_scfe.svg",
    imageCaption: "AP Pelvis Radiograph",
    choices: {
      A: "Legg-Calvé-Perthes disease — avascular necrosis due to impaired microcirculation from renal anemia",
      B: "Developmental dysplasia of the hip — delayed bilateral diagnosis in a non-obese child",
      C: "Slipped capital femoral epiphysis — renal osteodystrophy causes physeal fibrous degeneration and weakening",
      D: "Bilateral transient synovitis — immune-mediated inflammatory arthropathy in CKD",
      E: "Septic arthritis — bilateral hematogenous seeding in an immunocompromised dialysis patient"
    },
    correct: "C",
    explanation: "Slipped capital femoral epiphysis (SCFE) in a non-obese patient with ESRD and markedly elevated PTH is an 'atypical SCFE' caused by renal osteodystrophy. Secondary hyperparathyroidism weakens the physeal cartilage through fibrous transformation (replacing hydroxyapatite-rich zones with fibrous tissue), allowing the femoral head epiphysis to slip posteroinferiorly. Bilateral SCFE occurs in 20–40% of cases; in metabolic/endocrine causes (renal failure, hypothyroidism, GH deficiency, hypogonadism), bilaterality is far more common than in idiopathic obese adolescents. Treatment is urgent bilateral in-situ percutaneous cannulated screw fixation. (Lovell & Winter's Pediatric Orthopaedics; Loder RT et al.)"
  },

  {
    id: 11,
    subspecialty: "Pediatric",
    questionType: "Classification",
    stem: "A 10-week-old girl is referred for hip ultrasound after a positive Ortolani and Barlow examination at the newborn screen. Ultrasound shows an alpha angle of 52° and a beta angle of 56°. The cartilaginous acetabular roof has a normal convex shape. The femoral head is concentrically reduced with no displacement on stress views.\n\nAccording to Graf classification, which type is this hip, and what is the recommended management?",
    choices: {
      A: "Graf Type Ia (α ≥60°) — mature normal hip; no treatment required",
      B: "Graf Type IIa (α 50–59°, age <3 months) — physiologically immature; watchful waiting with repeat ultrasound at 6 weeks",
      C: "Graf Type IIb (α 50–59°, age ≥3 months) — pathological delayed ossification; Pavlik harness immediately",
      D: "Graf Type IIc (α 43–49°) — critical zone; Pavlik harness required regardless of age",
      E: "Graf Type III — decentered hip; closed reduction and Pavlik harness urgently"
    },
    correct: "B",
    explanation: "Graf Type IIa is defined by alpha angle 50–59° in a neonate under 3 months, representing physiological acetabular immaturity expected to normalize with growth. At 10 weeks with α = 52° and a concentric, reducible hip, watchful waiting with repeat ultrasound at 6 weeks is appropriate. The same alpha angle range in an infant ≥3 months (Graf IIb) indicates pathological delayed ossification requiring Pavlik harness treatment. Type IIc (α 43–49°) is the 'critical zone' — the cortical rim can no longer retain the cartilaginous head — and requires harness treatment at any age. (Graf R; Lovell & Winter's Pediatric Orthopaedics, 7th ed.)"
  },

  {
    id: 12,
    subspecialty: "Pediatric",
    questionType: "Management",
    stem: "A 7-year-old male presents with 4 months of right hip pain and a painless limp. AP and frog-leg lateral radiographs show fragmentation of the right femoral head consistent with Legg-Calvé-Perthes disease. Assessment of the lateral pillar reveals that it maintains approximately 55% of its original height with partial involvement. The left hip is normal.\n\nAccording to the Herring lateral pillar classification, which group is this, and what does current evidence recommend?",
    choices: {
      A: "Herring Group A — lateral pillar fully maintained; observation only with good prognosis",
      B: "Herring Group B — lateral pillar 50–100% height; containment surgery recommended for children ≥8 years at onset",
      C: "Herring Group B — lateral pillar 50–100% height; containment surgery shows no benefit over conservative management at any age",
      D: "Herring Group C — lateral pillar <50% height; any containment surgery is futile",
      E: "Herring Group B — surgical containment is contraindicated in children under 6 years"
    },
    correct: "B",
    explanation: "Herring Group B (lateral pillar height 50–100% maintained) has age-dependent outcomes: the landmark multicenter study (Herring et al., JBJS 2004) demonstrated that children ≥8 years at symptom onset with Group B disease have significantly better spherical femoral head outcomes with hip containment surgery (varus proximal femoral osteotomy or Salter innominate osteotomy) compared to non-operative treatment. Children <8 years with Group B disease do equally well with or without surgery. The B/C border (exactly 50% height loss with partial involvement) is treated as Group B for surgical decision-making. (Herring JA et al., JBJS 2004; Canale & Beaty, Campbell's Operative Orthopaedics)"
  },

  // ── FOOT & ANKLE ─────────────────────────────────────────────────────────────

  {
    id: 13,
    subspecialty: "Foot & Ankle",
    questionType: "Management",
    stem: "A 38-year-old woman presents with severe hallux valgus deformity and forefoot pain refractory to 18 months of conservative management including custom orthotics and wide footwear. AP weight-bearing radiograph is shown. HVA measures 40° and IMA measures 18°. Clinical examination confirms hypermobility of the 1st tarsometatarsal (TMT) joint.\n\nWhich surgical procedure addresses both the underlying deformity and its root cause most effectively?",
    imageFile: "q13_hallux_valgus.svg",
    imageCaption: "AP Weight-Bearing Foot Radiograph",
    choices: {
      A: "Austin (Chevron) osteotomy — best for severe IMA correction in distal metaphysis",
      B: "Scarf osteotomy of the 1st metatarsal shaft — moderate IMA correction without joint fusion",
      C: "Lapidus arthrodesis (1st TMT joint fusion) — corrects severe deformity and eliminates 1st ray hypermobility",
      D: "Keller resection arthroplasty — gold standard for active patients under 50",
      E: "Proximal opening wedge osteotomy alone — sufficient for IMA ≥16° without hypermobility"
    },
    correct: "C",
    explanation: "With HVA = 40° (severe: ≥40°), IMA = 18° (severe: ≥16°), and documented 1st TMT hypermobility, the Lapidus arthrodesis is the procedure of choice. It addresses the biomechanical root cause — hypermobility at the 1st TMT joint — and provides the greatest IMA correction (up to 10°) of any procedure. Fusion eliminates the unstable segment, giving the lowest long-term recurrence rate for severe deformity with hypermobility. Distal osteotomies (Chevron, Scarf) are limited to mild-to-moderate deformity and cannot correct 1st TMT hypermobility. Keller arthroplasty is reserved for low-demand elderly patients. (Mann's Surgery of the Foot and Ankle, 9th ed.; Coughlin & Shurnas)"
  },

  {
    id: 14,
    subspecialty: "Foot & Ankle",
    questionType: "Classification",
    stem: "A 21-year-old competitive basketball player presents with persistent lateral foot pain after a twisting injury 3 months ago treated conservatively with casting. He continues to have pain with activity. The AP foot radiograph is shown. Cortical thickening is seen on both sides of the fracture at the metaphyseal-diaphyseal junction of the 5th metatarsal, with partial intramedullary sclerosis but the medullary canal is not completely obliterated.\n\nWhat is the Torg classification and most appropriate management?",
    imageFile: "q14_5th_metatarsal.svg",
    imageCaption: "AP Foot Radiograph — 5th Metatarsal",
    choices: {
      A: "Torg I — acute fracture, no sclerosis; non-weight-bearing short leg cast for 8 weeks",
      B: "Torg II — delayed union with intramedullary sclerosis; intramedullary screw fixation",
      C: "Torg III — non-union with complete canal obliteration; curettage and bone grafting only",
      D: "Zone 1 avulsion fracture of the styloid; surgical fixation with tension-band wiring",
      E: "Torg II — delayed union; repeat casting for another 8 weeks before considering surgery"
    },
    correct: "B",
    explanation: "Torg II (delayed union) is characterized by intramedullary sclerosis, periosteal callus, and cortical thickening but without complete obliteration of the medullary canal. In competitive athletes with Torg II Jones fractures, intramedullary screw fixation (4.5 mm cannulated screw) provides the fastest return to sport (12–16 weeks) and lowest re-fracture rate (>90% union). Repeat conservative casting carries a >50% non-union rate in this population. Torg III (complete canal obliteration) requires both screw fixation and bone grafting. Zone 1 tuberosity avulsions are treated non-operatively. (Torg JS et al., JBJS 1984; Porter DA et al.; Mann's Surgery of the Foot and Ankle)"
  },

  {
    id: 15,
    subspecialty: "Foot & Ankle",
    questionType: "Management",
    stem: "A 51-year-old woman presents with 8 months of progressive medial ankle pain and arch collapse in the right foot. She is unable to perform a single-leg heel rise on the affected side. Examination demonstrates hindfoot valgus that is flexible (fully correctable with non-weight-bearing). MRI shows marked posterior tibial tendon degeneration and elongation. There is no fixed deformity of the midfoot or hindfoot.\n\nWhich Johnson-Strom stage is this, and what is the recommended surgical management?",
    choices: {
      A: "Stage I — tenosynovitis with intact tendon function; FDL tendon transfer alone",
      B: "Stage II — flexible flatfoot deformity; FDL tendon transfer + calcaneal medializing osteotomy ± spring ligament repair",
      C: "Stage II — flexible flatfoot; isolated spring ligament repair without tendon transfer",
      D: "Stage III — rigid flatfoot deformity; triple arthrodesis (subtalar + talonavicular + calcaneocuboid)",
      E: "Stage IV — valgus tibiotalar tilt; ankle replacement with simultaneous flatfoot correction"
    },
    correct: "B",
    explanation: "Stage II PTTD (Johnson-Strom) presents with a flexible, passively correctable hindfoot valgus and failed single-heel rise due to tendon insufficiency. Surgical management combines: (1) FDL tendon transfer to restore active hindfoot inversion, and (2) calcaneal medializing osteotomy to shift the weight-bearing axis medially, offload the repair, and correct hindfoot valgus. Spring ligament reconstruction is added when significant medial column instability or talonavicular sag is present. Stage III (rigid deformity uncorrectable passively) requires triple arthrodesis. Stage IV adds valgus ankle tilt requiring pantalar reconstruction. (Mann's Surgery of the Foot and Ankle, 9th ed.; Johnson KA & Strom DE)"
  },

  // ── HAND SURGERY ─────────────────────────────────────────────────────────────

  {
    id: 16,
    subspecialty: "Hand",
    questionType: "Diagnosis",
    stem: "A 32-year-old male presents after striking a wall with his right fist. He reports pain over the dorsum of the ring finger MCP joint. On examination, with the finger flexed, the extensor digitorum communis tendon of the ring finger visibly subluxes into the ulnar gutter between the metacarpal heads. With passive extension assistance, the tendon returns to the dorsal midline. There is no skin laceration.\n\nWhat is the most likely diagnosis?",
    choices: {
      A: "Trigger finger — stenosing tenosynovitis causing snapping at the A1 pulley",
      B: "Mallet finger — zone I extensor tendon disruption at the DIP joint",
      C: "Radial sagittal band rupture with ulnar subluxation of the extensor tendon",
      D: "Boutonnière deformity — zone III extensor tendon disruption at the PIP joint",
      E: "Jersey finger — flexor digitorum profundus avulsion from the distal phalanx"
    },
    correct: "C",
    explanation: "The sagittal bands are fibrous extensions of the extensor hood that centralize the EDC tendon over the MCP joint. Radial sagittal band rupture (from forced flexion during striking) allows the tendon to sublux into the ulnar valley between metacarpal heads during flexion. The ring finger MCP is most commonly affected. Key clinical test: the patient cannot actively extend the finger from a flexed position without the tendon 'snapping' ulnarly, but can maintain extension once passively positioned. Acute injury (<6 weeks): extension splinting of the MCP at neutral for 4–6 weeks. Chronic: sagittal band reconstruction. (Green's Operative Hand Surgery, 7th ed.; Catalano LW et al.)"
  },

  {
    id: 17,
    subspecialty: "Hand",
    questionType: "Management",
    stem: "A 25-year-old male sustains a clean laceration to the volar surface of the right index finger at the level of the proximal phalanx (zone II). Both flexor digitorum superficialis and profundus are completely transected. Primary repair is performed 8 hours after injury. The patient will be placed on an early active mobilization rehabilitation protocol.\n\nWhich repair technique for the FDP tendon provides the tensile strength required for early active motion?",
    choices: {
      A: "2-strand modified Kessler core suture with simple epitendinous suture",
      B: "4-strand cruciate core suture with circumferential epitendinous suture",
      C: "6-strand core suture (modified Tang or Lim-Tsai technique) with circumferential epitendinous suture",
      D: "Figure-of-eight 4-0 nylon suture alone, without epitendinous reinforcement",
      E: "Primary tendon graft reconstruction using palmaris longus as a priority over direct repair"
    },
    correct: "C",
    explanation: "Tensile strength of flexor tendon repair scales directly with strand count crossing the repair site: 2-strand ≈ 20–30 N, 4-strand ≈ 40–50 N, 6-strand ≈ 60–80 N. Early active mobilization protocols (e.g., Indiana protocol) generate up to 40–50 N at the repair site during gentle active flexion; 6-strand repairs provide the necessary safety margin against gap formation and rupture. A circumferential epitendinous suture (3-0 nylon, horizontal mattress or running) adds a further 10–50% to repair strength and reduces step formation. The Tang 6-strand technique has become the gold standard for zone II repairs in active rehabilitation programs. (Green's Operative Hand Surgery; Tang JB et al.)"
  },

  {
    id: 18,
    subspecialty: "Hand",
    questionType: "Complication",
    stem: "A 62-year-old woman with a 15-year history of seropositive rheumatoid arthritis presents with sudden inability to extend the right ring and small fingers at the MCP joints. She reports no acute trauma. The ring and small finger EDC tendons are absent on palpation over the dorsum of the hand. With the fingers passively extended, active extension can be maintained, but active extension from a flexed position is impossible.\n\nWhat is the most likely underlying mechanism of this complication?",
    choices: {
      A: "Posterior interosseous nerve compression at the radial tunnel causing intrinsic-minus posture",
      B: "Anterior interosseous nerve palsy causing inability to flex the IP joints",
      C: "Extensor tendon attrition rupture over the eroded, dorsally subluxated distal ulna (Vaughan-Jackson syndrome)",
      D: "Bilateral trigger finger (FDS) locked in flexion at the ring and small finger MCP joints",
      E: "Zone III central slip rupture at the PIP joint causing Boutonnière deformity"
    },
    correct: "C",
    explanation: "The Vaughan-Jackson lesion describes sequential, painless extensor tendon ruptures caused by attrition over a dorsally subluxated, eroded distal ulna in rheumatoid arthritis. Ruptures progress from ulnar to radial (small → ring → long → index), and the absence of palpable EDC tendons with preserved passive extendability confirms tendon — not nerve — pathology (PIN palsy would cause inability to maintain extension passively). Treatment: Darrach procedure (distal ulna resection) or Sauvé-Kapandji to eliminate the abrasive stump, combined with EIP-to-ring/small tendon transfer for reconstruction. (Green's Operative Hand Surgery, 7th ed.; Vaughan-Jackson OJ, JBJS 1948)"
  },

  // ── TUMOR ────────────────────────────────────────────────────────────────────

  {
    id: 19,
    subspecialty: "Tumor",
    questionType: "Diagnosis",
    stem: "A 15-year-old male presents with 2 months of progressive right distal femur pain and a palpable firm tender mass. Radiograph shows a destructive metaphyseal lesion with aggressive periosteal reaction. Biopsy demonstrates pleomorphic spindle cells producing osteoid matrix. Which radiographic finding is MOST characteristic of osteosarcoma and best distinguishes it from Ewing sarcoma?",
    choices: {
      A: "'Onion skin' layered periosteal reaction arising from the diaphysis",
      B: "Expansile 'soap bubble' pattern with sharp geographic margins",
      C: "'Sunburst' periosteal reaction and/or Codman triangle at the advancing tumor margin",
      D: "Central radiolucent lesion located in the mid-diaphysis of the femur",
      E: "Uniform sclerotic matrix replacing the epiphysis with preserved cortex"
    },
    correct: "C",
    explanation: "Osteosarcoma classically produces aggressive periosteal reactions: the 'sunburst' pattern (spiculated new bone radiating perpendicularly from the cortex) reflects tumor penetration through the cortex, and the Codman triangle (reactive periosteum lifted at the tumor margin) represents the leading edge of bone production. Ewing sarcoma more typically originates in the diaphysis/metadiaphysis with a permeative pattern and 'onion-skin' laminated periosteal reaction. The soap-bubble pattern is characteristic of GCT and ABC. Distinguishing features matter because treatment protocols differ fundamentally. (Unni KK, Dahlin's Bone Tumors; Campbell's Operative Orthopaedics)"
  },

  {
    id: 20,
    subspecialty: "Tumor",
    questionType: "Management",
    stem: "A 27-year-old woman presents with 3 months of right knee pain. The AP distal femur radiograph is shown. Fine-needle aspiration demonstrates abundant multinucleated giant cells and mononuclear stromal cells consistent with giant cell tumor (GCT). CT confirms cortical thinning with slight expansion but intact cortex and no soft tissue extension.\n\nWhat is the Campanacci grade and the recommended surgical management?",
    imageFile: "q20_gct_femur.svg",
    imageCaption: "AP Distal Femur Radiograph",
    choices: {
      A: "Campanacci Grade I — latent, well-defined; intralesional curettage without adjuvant sufficient",
      B: "Campanacci Grade II — active, cortex thinned but intact; extended curettage with high-speed burr + adjuvant + PMMA cement ± plate fixation",
      C: "Campanacci Grade III — aggressive, cortex destroyed; wide en bloc resection with endoprosthetic reconstruction",
      D: "Campanacci Grade II — active; radiation therapy followed by curettage",
      E: "Campanacci Grade I — conservative management with bisphosphonates and watchful waiting"
    },
    correct: "B",
    explanation: "Campanacci Grade II GCT has cortical thinning/expansion with an intact cortical shell and no soft-tissue mass (Grade III shows cortical breakthrough and extraosseous extension). Grade II is managed with extended curettage: the cavity is enlarged using a high-speed burr ('burring') to remove macroscopic tumor and the sclerotic margin, followed by a chemical adjuvant (liquid nitrogen, phenol, or hydrogen peroxide) to reduce local recurrence, and filling with PMMA cement. Cement allows subchondral support, permits radiographic surveillance for recurrence, and has an exothermic reaction that may further kill residual tumor cells. Structural plate fixation is added when subchondral integrity is compromised. (Campanacci M et al.; van der Heijden L et al.; Campbell's Operative Orthopaedics)"
  },

  {
    id: 21,
    subspecialty: "Tumor",
    questionType: "Investigation",
    stem: "A 16-year-old male presents with 6 weeks of progressive right distal femur pain. AP radiograph shows a well-defined eccentric lytic lesion with a thin expanded cortical shell and no matrix mineralization. MRI is obtained for further characterization.\n\nWhich MRI finding is most pathognomonic for aneurysmal bone cyst (ABC) and best distinguishes it from other lytic lesions including giant cell tumor and telangiectatic osteosarcoma?",
    choices: {
      A: "Homogeneous low T1 / high T2 signal throughout the lesion",
      B: "Multiple fluid-fluid levels (layering blood products at different stages) within internal cystic spaces on T2 sequences",
      C: "Diffuse high T1 signal throughout indicating fat content (lipoma variant)",
      D: "'Target sign' with central high T2 surrounded by peripheral low T1 rim",
      E: "Homogeneous gadolinium enhancement of the entire solid lesion"
    },
    correct: "B",
    explanation: "Fluid-fluid levels on MRI — horizontal layering of blood products at different stages of degradation (acute blood, serum, debris) within thin-walled hemorrhagic cysts separated by fibrous septa — are pathognomonic for aneurysmal bone cyst. This finding is present in >90% of ABC cases. While GCT and telangiectatic osteosarcoma can occasionally show fluid levels, the combination of an expansile lytic eccentric lesion with prominent multi-compartment fluid-fluid levels strongly supports ABC. Biopsy is still required to exclude telangiectatic osteosarcoma (which has similar MRI features but shows malignant stroma). (Helms CA, Fundamentals of Skeletal Radiology; Murphey MD et al.)"
  },

  // ── ARTHROPLASTY ─────────────────────────────────────────────────────────────

  {
    id: 22,
    subspecialty: "Arthroplasty",
    questionType: "Diagnosis",
    stem: "A 68-year-old male, 2 years after total hip arthroplasty, presents with 6 months of persistent left hip pain. Serum ESR is 54 mm/hr (normal <30) and CRP is 22 mg/L (normal <10). Hip aspiration yields 4,200 WBC/μL with 85% polymorphonuclear cells. One of two synovial fluid cultures grows coagulase-negative Staphylococcus epidermidis.\n\nAccording to the 2018 ICM criteria, how should this patient be classified?",
    choices: {
      A: "Not PJI — a single positive culture with a skin commensal organism is insufficient for diagnosis",
      B: "Inconclusive — ESR and CRP are only mildly elevated and do not meet criteria",
      C: "PJI confirmed — minor criteria score ≥6, meeting the threshold for diagnosis",
      D: "Aseptic loosening — elevated inflammatory markers are expected after cemented THA",
      E: "Possible PJI — requires additional alpha-defensin synovial fluid testing before classification"
    },
    correct: "C",
    explanation: "The 2018 ICM scoring system assigns points to minor criteria: ESR ≥30 (2 pts) + CRP ≥10 (2 pts) + synovial WBC ≥3,000/μL (3 pts) + PMN ≥80% (2 pts) + single positive culture (2 pts) = 11 points total. A score ≥6 confirms PJI. This patient satisfies all five minor criteria for a total of 11 points, far exceeding the threshold. A single positive culture with a skin commensal (such as S. epidermidis) contributes 2 points but is not a standalone major criterion (which requires two positive cultures of the same organism). The combination of multiple elevated minor criteria here confirms PJI with high confidence. (Parvizi J et al., ICM 2018; Osmon DR et al., IDSA 2013)"
  },

  {
    id: 23,
    subspecialty: "Arthroplasty",
    questionType: "Classification",
    stem: "A 74-year-old woman with a total knee arthroplasty placed 6 years ago presents after a ground-level fall. The AP knee radiograph is shown. The fracture is displaced approximately 1.5 cm and angulated, and intraoperative assessment confirms the femoral component is solidly well-fixed with no interface radiolucency.\n\nAccording to the Rorabeck (Lewis-Rorabeck) classification, which type is this fracture, and what is the preferred treatment?",
    imageFile: "q23_periprosthetic_tka.svg",
    imageCaption: "AP Knee Radiograph — Post Total Knee Arthroplasty",
    choices: {
      A: "Type I — undisplaced fracture, well-fixed component; cast immobilization",
      B: "Type II — displaced fracture, well-fixed component; ORIF with lateral locking plate or retrograde IM nail",
      C: "Type III — displaced fracture, unstable component; revision arthroplasty with distal femoral replacement",
      D: "Type I — undisplaced fracture, well-fixed component; ORIF indicated despite no displacement",
      E: "Type II — displaced fracture, unstable component; ORIF alone is insufficient"
    },
    correct: "B",
    explanation: "Rorabeck Type I = undisplaced + well-fixed component; Type II = displaced + well-fixed component; Type III = any displacement + loose component. This displaced fracture above a well-fixed femoral component is Type II, requiring ORIF. Lateral locking plate (LISS plate) is the workhorse — it provides angular stable fixation in the osteoporotic periimplant bone. Retrograde intramedullary nail is an excellent alternative when the femoral component box geometry permits nail passage (open-box or posterior-stabilized designs are typically accessible). Revision arthroplasty (distal femoral replacement) is reserved for Type III (loose implant) or fractures too distal for plate/nail fixation. (Lewis & Rorabeck; Su ET et al.; Campbell's Operative Orthopaedics)"
  },

  {
    id: 24,
    subspecialty: "Arthroplasty",
    questionType: "Management",
    stem: "A 65-year-old man develops fever, wound drainage, and acute knee pain 18 days after an uncomplicated primary total knee arthroplasty. ESR is 110 mm/hr, CRP is 180 mg/L. Aspiration yields 62,000 WBC/μL with 96% PMNs. Intraoperative assessment confirms the femoral and tibial components are solidly well-fixed with no gross loosening. Blood cultures grow methicillin-sensitive Staphylococcus aureus (MSSA).\n\nWhich management provides the best outcome in this clinical scenario?",
    choices: {
      A: "Suppressive long-term oral antibiotics alone without surgical debridement",
      B: "Single-stage revision: remove all components and immediately reimplant new prosthesis",
      C: "Two-stage revision: remove all components, 6-week antibiotic-loaded cement spacer, then reimplantation",
      D: "DAIR (Debridement, Antibiotics, and Implant Retention) with modular polyethylene liner exchange",
      E: "IV antibiotics for 6 weeks followed by reassessment without surgical intervention"
    },
    correct: "D",
    explanation: "DAIR is the treatment of choice for acute PJI (symptoms <3 weeks from arthroplasty or acute hematogenous onset) with a well-fixed implant, immature biofilm, and a sensitive organism. Mandatory components: thorough surgical debridement, copious irrigation, and exchange of all modular components (polyethylene liner, femoral head) to remove biofilm-colonized surfaces, followed by 6 weeks of organism-directed IV antibiotics. DAIR success rates approach 70–80% for MSSA within 4 weeks. Two-stage revision is the gold standard for late/chronic PJI (>4 weeks) or resistant organisms. Antibiotics alone without surgery are never adequate for confirmed PJI with an accessible joint. (Osmon DR et al., IDSA 2013; Parvizi J et al.; Zimmerli W et al.)"
  },

  // ── METABOLIC BONE DISEASE ───────────────────────────────────────────────────

  {
    id: 25,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Diagnosis",
    stem: "A 54-year-old woman with severe rheumatoid arthritis has been on prednisolone 10 mg/day for 3 years. She presents with acute thoracic back pain after a minor lifting incident. Radiographs confirm a T8 vertebral compression fracture. DEXA scan shows T-score of −2.8 at the lumbar spine. Her serum calcium, phosphate, 25-OH vitamin D, and PTH are all within normal limits.\n\nWhich statement MOST accurately describes the pathophysiology of her bone loss?",
    choices: {
      A: "Bone loss from corticosteroids occurs primarily after 3 years; risk is low in the first 12 months",
      B: "Prednisone doses below 7.5 mg/day carry no meaningful fracture risk regardless of treatment duration",
      C: "Glucocorticoids suppress osteoblastogenesis via Wnt/beta-catenin inhibition and increase RANK-L, causing both decreased formation and increased resorption",
      D: "Fracture risk from glucocorticoid use correlates strictly with T-score, not with dose or duration",
      E: "Bisphosphonate therapy is contraindicated as it may cause osteonecrosis of the jaw in RA patients on steroids"
    },
    correct: "C",
    explanation: "Glucocorticoids cause bone loss through two major pathways: (1) decreased formation — they suppress Wnt/beta-catenin signaling in osteoblast progenitors (inhibiting differentiation), induce osteoblast and osteocyte apoptosis, and reduce IGF-1; (2) increased resorption — they upregulate RANK-L and downregulate OPG, promoting osteoclastogenesis. Indirect effects include decreased intestinal calcium absorption and increased renal calcium excretion leading to secondary hyperparathyroidism. Bone loss is most rapid in the first 3–6 months (3–5% trabecular loss in year 1). Any dose for >3 months warrants FRAX-based fracture risk assessment; bisphosphonates (alendronate/risedronate/zoledronic acid) are first-line. (ACR Guidelines for GIOP; Canalis E; Rosen CJ)"
  },

  {
    id: 26,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Management",
    stem: "A 66-year-old woman on alendronate for 9 years presents with 3 months of dull aching right thigh pain with no history of trauma. AP radiograph of the right femur is shown. Lateral cortical thickening ('beaking') is seen at the subtrochanteric region with a transverse incomplete fracture line. The left femur radiograph is normal.\n\nWhich management strategy is most appropriate?",
    imageFile: "q26_aff.svg",
    imageCaption: "AP Right Femur Radiograph",
    choices: {
      A: "Continue alendronate; add calcium/vitamin D; protected weight-bearing with crutches for 8 weeks",
      B: "Discontinue alendronate; initiate teriparatide; prophylactic intramedullary nail fixation of the right femur",
      C: "Switch from alendronate to denosumab; conservative management with restricted weight-bearing",
      D: "Stop alendronate; switch to annual zoledronic acid infusion; repeat X-ray in 6 months",
      E: "Cast immobilization of the right lower limb; no change to bisphosphonate therapy"
    },
    correct: "B",
    explanation: "Atypical femoral fractures (AFF) are a rare but serious complication of long-term bisphosphonate use (>5 years). Immediate management requires: (1) Bisphosphonate holiday — stop alendronate, as continued use impairs fracture healing; (2) Teriparatide (PTH 1-34 analogue) — the only agent with evidence for accelerating AFF healing and is the preferred anabolic choice; (3) Prophylactic intramedullary nail fixation — an incomplete AFF is an impending fracture at the subtrochanteric region (highest biomechanical stress); nailing prevents complete fracture and avoids catastrophic failure. Contralateral femur imaging is mandatory (30% bilateral rate). (Shane E et al., ASBMR Task Force 2014; Banffy MB et al.)"
  },

  {
    id: 27,
    subspecialty: "Metabolic Bone Disease",
    questionType: "Investigation",
    stem: "A 45-year-old male presents with diffuse bone pain, proximal muscle weakness, and difficulty walking. Pelvic radiographs show bilateral Looser zones (pseudofractures) in the medial femoral necks. He has had no sun exposure for years and has a nutritionally deficient diet.\n\nWhich laboratory pattern is most consistent with nutritional vitamin D deficiency osteomalacia?",
    choices: {
      A: "Low Ca, high PO4, elevated ALP, high 25-OH vitamin D, low PTH",
      B: "High Ca, low PO4, elevated ALP, low 25-OH vitamin D, low PTH",
      C: "Low-to-normal Ca, low PO4, markedly elevated ALP, low 25-OH vitamin D, elevated PTH",
      D: "Normal Ca, normal PO4, normal ALP, normal 25-OH vitamin D — diagnosis excluded by normal labs",
      E: "Low Ca, normal PO4, normal ALP, normal 25-OH vitamin D, low PTH"
    },
    correct: "C",
    explanation: "Vitamin D deficiency osteomalacia produces a cascade: low 25-OH vitamin D → reduced intestinal calcium absorption → secondary hyperparathyroidism (elevated PTH) → PTH-driven phosphaturia (low serum phosphate) and calcium mobilization from bone (Ca may be low-normal). Osteoblasts continue producing unmineralized osteoid, driving markedly elevated ALP. Looser zones (pseudofractures) on the compression side of bones are pathognomonic. The complete biochemical fingerprint is: low 25-OH vitamin D + elevated PTH + low-normal Ca + low PO4 + markedly elevated ALP. Treatment: high-dose vitamin D repletion (cholecalciferol) plus calcium supplementation. (Favus MJ, Primer on Metabolic Bone Diseases; Campbell's Operative Orthopaedics)"
  },

  // ── BASIC SCIENCE ─────────────────────────────────────────────────────────────

  {
    id: 28,
    subspecialty: "Basic Science",
    questionType: "Interpretation",
    stem: "A biomechanical study examines the stress-strain curve of the anterior cruciate ligament. The initial portion of the curve (0–3% strain) shows a low-stiffness, high-compliance region before transitioning to a steep linear elastic zone.\n\nWhich structural phenomenon at the collagen fibril level best explains the mechanical behavior of the ligament in this initial 'toe region'?",
    choices: {
      A: "Plastic deformation — irreversible elongation of collagen fibers beyond their yield point",
      B: "Crimp uncurling — progressive recruitment and straightening of the sinusoidal waviness of collagen fibrils",
      C: "Elastic modulus is lowest here because elastin fibers predominate in the superficial ligament layer",
      D: "Microtear propagation through the ligament substance before full load transfer",
      E: "Strain hardening — progressive increase in cross-link density with elongation"
    },
    correct: "B",
    explanation: "In the resting state, collagen fibrils within a ligament have a natural sinusoidal waviness called 'crimp.' The toe region of the stress-strain curve represents the progressive uncrimping (straightening) of these collagen fibril waves under low tensile loads, allowing large deformation at minimal force — corresponding to the normal physiological range of joint motion (0–3% strain). Once all fibrils have been recruited and straightened, the ligament enters the linear (elastic) region with high stiffness. Plastic deformation begins at the yield point (beyond the linear region). This crimp architecture allows energy absorption during normal activity without microscopic fiber damage. (Silver FH; Nordin & Frankel, Basic Biomechanics of the Musculoskeletal System)"
  },

  {
    id: 29,
    subspecialty: "Basic Science",
    questionType: "Diagnosis",
    stem: "A 72-year-old woman with severe postmenopausal osteoporosis, T-score −3.4 at the lumbar spine, has sustained three vertebral compression fractures in 2 years despite 5 years of alendronate therapy. Her physician is considering initiating romosozumab.\n\nWhich statement most accurately describes the mechanism of action of romosozumab?",
    choices: {
      A: "Binds and inhibits RANK-L, reducing osteoclast differentiation and bone resorption",
      B: "Recombinant PTH (1-34) analogue that stimulates bone formation via intermittent PTH receptor activation",
      C: "Monoclonal antibody against sclerostin — inhibits its antagonism of Wnt/beta-catenin signaling, simultaneously increasing bone formation and decreasing bone resorption",
      D: "Estrogen receptor modulator that reduces osteoclast activity via estrogen-mediated transcriptional pathways",
      E: "Activates the Frizzled receptor directly, bypassing sclerostin inhibition to stimulate Wnt target gene transcription"
    },
    correct: "C",
    explanation: "Sclerostin is a glycoprotein secreted by osteocytes that normally antagonizes Wnt/beta-catenin signaling by binding LRP5/6 co-receptors. Romosozumab (anti-sclerostin monoclonal antibody) blocks sclerostin, thereby disinhibiting Wnt signaling. This produces a dual effect: (1) anabolic — increased osteoblast differentiation and bone matrix production; (2) anti-catabolic — decreased RANK-L expression (osteocytes are major RANK-L sources), reducing osteoclast activity. This mechanism is unique among approved osteoporosis agents. Romosozumab is given as 210 mg SC monthly for 12 months, followed by antiresorptive therapy to maintain gains. (Cosman F et al., ARCH Study NEJM 2016; McClung MR et al.)"
  },

  {
    id: 30,
    subspecialty: "Basic Science",
    questionType: "Classification",
    stem: "A 22-year-old male sustains a forced flexion injury to the right index finger distal interphalangeal (DIP) joint during a basketball game. He presents with a 'dropped' DIP joint and inability to actively extend it. Radiograph shows an avulsion fracture involving approximately 30% of the articular surface of the distal phalanx base, with no volar subluxation of the distal phalanx.\n\nAccording to Verdan's extensor tendon zone classification, what zone is this injury, and what is the recommended treatment?",
    choices: {
      A: "Zone I (DIP joint level) — bony mallet finger with <50% articular involvement and no subluxation; continuous DIP extension splinting for 6–8 weeks",
      B: "Zone II (middle phalanx) — primary surgical repair with pull-out wire technique",
      C: "Zone III (PIP joint) — Boutonnière deformity protocol with PIP extension splinting",
      D: "Zone I — bony mallet finger with fracture involving >50% articular surface; immediate ORIF with K-wire",
      E: "Zone IV (proximal phalanx) — cast immobilization with MCP and PIP in extension"
    },
    correct: "A",
    explanation: "Verdan Zone I covers the extensor mechanism at the DIP joint level. Bony mallet fingers (terminal extensor tendon avulsion with fracture) are managed based on fracture size and joint congruence: fractures involving <50% of the articular surface WITHOUT volar DIP subluxation are treated conservatively with continuous DIP joint extension splinting (Stack or Stax splint) in 0–10° of extension for 6 weeks, followed by nighttime splinting for 6 more weeks. Surgical indications: fracture ≥50% articular surface OR volar subluxation of the distal phalanx (joint instability). Interruption of splinting (even once) resets the 6-week clock. (Green's Operative Hand Surgery, 7th ed.; Doyle JR; Alla SR et al.)"
  }

];
