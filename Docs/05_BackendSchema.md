# Backend Schema

## Static JSON/TS Data

### Profile
- name
- role
- bio
- socials

### Scenario (new — core entity for this revision)

This is the new top-level entity that structures the immersive
experience. Projects, skills, and experience are no longer flat,
independently-listed sections — they are consumed *through* scenarios.
The flat entities below still exist (for Skills/Certifications/Blog
sections, resume generation, SEO structured data, etc.) but the
Scenarios section is the primary narrative surface.

```
Scenario
- id
- slug
- title                    e.g. "Offensive Security"
- accentColor              one of: red-amber | blue | violet | teal
- environmentType          network-topology | audit-ledger |
                            encrypted-vault | cloud-architecture
- summary                  1–2 sentence framing, used in fallback
                            meta/SEO and as the non-JS text summary
- narrativeBeats[]
  - id
  - order
  - heading
  - body
  - relatedSkillIds[]      references Skill.id
- interactiveMoment
  - type                   trace | reveal | inspect  (kept to this
                            small enum on purpose — see UI/UX doc,
                            avoid scope creep into mini-games)
  - description
  - triggerLabel           accessible label for the interaction,
                            used identically on both rendering tiers
- payoffProjectId          references Project.id
- scene3D                  (nullable — full-tier only)
  - modelPath               .glb path, Draco/KTX2 compressed
  - cameraKeyframes[]        scroll-progress-indexed camera states
- fallback                  (required — always present)
  - illustrationRef         static/SVG asset or Framer Motion
                            component reference
  - animationBeats[]         maps 1:1 to narrativeBeats[] above
```

### Project
- id
- title
- slug
- description
- techStack[]
- images[]
- github
- live
- featured
- **scenarioId** (new — links back to the owning Scenario, nullable
  for any project not surfaced through a scenario)

### Certificates
- id
- title
- issuer
- date
- credentialUrl

### Experience
- company
- role
- startDate
- endDate
- achievements[]
- **relatedScenarioIds[]** (new — an experience entry can inform
  multiple scenarios, e.g. the HackersVilla internship feeds both
  Offensive Security and GRC scenarios)

### Skill (new — previously implicit inside flat lists, now explicit
so `narrativeBeats[].relatedSkillIds` can reference it)
- id
- name
- category            offensive | grc | ai-security | cloud | general
- proficiencyNote      optional, short

### Blog
- slug
- title
- tags
- date

### Contact
- name
- email
- message

## Data Integrity Rule (new — enforced at build time, not just convention)

Every `Scenario` must have a non-null `fallback` object with
`animationBeats[]` count matching `narrativeBeats[]` count. This is
what guarantees the PRD's "100% content parity between tiers"
requirement — a scenario cannot ship with a 3D scene and no fallback,
and a build-time check should fail if one is added without the other.
