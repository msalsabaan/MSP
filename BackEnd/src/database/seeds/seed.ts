import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import configuration from '../../config/configuration';
import { Role } from '../../common/enums/role.enum';
import { dataSourceOptions } from '../data-source';
import { BlogPost, BlogStatus } from '../../modules/blog/entities/blog-post.entity';
import { ContactMessage } from '../../modules/contact/entities/contact-message.entity';
import { Partner } from '../../modules/partners/entities/partner.entity';
import { Project, ProjectStatus } from '../../modules/projects/entities/project.entity';
import { Service } from '../../modules/services/entities/service.entity';
import { Setting } from '../../modules/settings/entities/setting.entity';
import { TeamMember } from '../../modules/team/entities/team-member.entity';
import { Testimonial } from '../../modules/testimonials/entities/testimonial.entity';
import { User } from '../../modules/users/entities/user.entity';

const L = (en: string, ar: string) => ({ en, ar });

async function upsert<T>(
  ds: DataSource,
  entity: new () => T,
  where: object,
  data: Partial<T>,
): Promise<void> {
  const repo = ds.getRepository(entity);
  const existing = await repo.findOne({ where: where as any });
  if (existing) {
    await repo.save({ ...existing, ...data });
  } else {
    await repo.save(repo.create(data as any));
  }
}

async function run() {
  const cfg = configuration();
  const ds = new DataSource(dataSourceOptions);
  await ds.initialize();
  console.log('Connected. Seeding…');

  // --- Admin user ---
  const userRepo = ds.getRepository(User);
  const adminEmail = cfg.seed.adminEmail;
  if (!(await userRepo.findOne({ where: { email: adminEmail } }))) {
    await userRepo.save(
      userRepo.create({
        email: adminEmail,
        name: 'MSP Admin',
        role: Role.SuperAdmin,
        active: true,
        passwordHash: await bcrypt.hash(cfg.seed.adminPassword, 10),
      }),
    );
    console.log(`  ✓ admin user ${adminEmail}`);
  }

  // --- Projects ---
  const projects: Partial<Project>[] = [
    {
      slug: 'neom-cultural-pavilion',
      no: '01',
      title: L('NEOM Cultural Pavilion', 'جناح نيوم الثقافي'),
      typology: { key: 'cultural', en: 'Cultural', ar: 'ثقافي' },
      location: L('NEOM, Tabuk', 'نيوم، تبوك'),
      year: '2025',
      cover: 'images/proj-1.jpg',
      gallery: ['images/proj-1.jpg', 'images/proj-2.jpg'],
      summary: L(
        'A civic pavilion framing the desert horizon through layered stone screens.',
        'جناح عام يؤطّر أفق الصحراء عبر مصافٍ حجرية متدرّجة.',
      ),
      description: [
        L('Architecture, structural and MEP design for a 6,000 m² cultural venue.',
          'تصميم معماري وإنشائي وكهروميكانيكي لمنشأة ثقافية بمساحة 6000 م².'),
      ],
      specs: [
        { label: L('Client', 'العميل'), value: L('NEOM', 'نيوم') },
        { label: L('Area', 'المساحة'), value: L('6,000 m²', '6000 م²') },
      ],
      services: [L('Architecture', 'العمارة'), L('Structural', 'الإنشائي')],
      clientName: 'NEOM',
      status: ProjectStatus.Published,
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'qiddiya-sports-complex',
      no: '02',
      title: L('Qiddiya Sports Complex', 'مجمّع القدية الرياضي'),
      typology: { key: 'sports', en: 'Sports', ar: 'رياضي' },
      location: L('Qiddiya, Riyadh', 'القدية، الرياض'),
      year: '2024',
      cover: 'images/proj-2.jpg',
      gallery: ['images/proj-2.jpg', 'images/proj-3.jpg'],
      summary: L('A multi-venue sports campus with a unifying shaded concourse.',
        'حرم رياضي متعدّد المنشآت برواق مظلّل يوحّد المكوّنات.'),
      description: [L('Full engineering consultancy for stadia and training facilities.',
        'استشارات هندسية متكاملة للملاعب ومرافق التدريب.')],
      specs: [
        { label: L('Client', 'العميل'), value: L('Qiddiya', 'القدية') },
        { label: L('Capacity', 'السعة'), value: L('20,000', '20000') },
      ],
      services: [L('Structural', 'الإنشائي'), L('MEP', 'الكهروميكانيكا')],
      clientName: 'Qiddiya',
      status: ProjectStatus.Published,
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'riyadh-mixed-use-tower',
      no: '03',
      title: L('Riyadh Mixed-Use Tower', 'برج الرياض متعدّد الاستخدامات'),
      typology: { key: 'mixed', en: 'Mixed-use', ar: 'متعدّد الاستخدامات' },
      location: L('Riyadh', 'الرياض'),
      year: '2024',
      cover: 'images/proj-3.jpg',
      gallery: ['images/proj-3.jpg', 'images/proj-4.jpg'],
      summary: L('Office, retail and residential stacked around a daylit atrium.',
        'مكاتب وتجزئة وسكن حول بهو مضاء بالنهار.'),
      description: [L('Architecture and engineering for a 32-storey tower.',
        'العمارة والهندسة لبرج من 32 طابقًا.')],
      specs: [{ label: L('Floors', 'الطوابق'), value: L('32', '32') }],
      services: [L('Architecture', 'العمارة'), L('MEP', 'الكهروميكانيكا')],
      clientName: 'Private',
      status: ProjectStatus.Published,
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'diriyah-civic-center',
      no: '04',
      title: L('Diriyah Civic Center', 'مركز الدرعية المدني'),
      typology: { key: 'civic', en: 'Civic', ar: 'مبنى عام' },
      location: L('Diriyah, Riyadh', 'الدرعية، الرياض'),
      year: '2023',
      cover: 'images/proj-4.jpg',
      gallery: ['images/proj-4.jpg', 'images/proj-1.jpg'],
      summary: L('A civic hall in dialogue with Najdi mud-brick heritage.',
        'قاعة مدنية تحاور إرث الطين النجدي.'),
      description: [L('Heritage-sensitive architecture and structural design.',
        'عمارة وتصميم إنشائي يراعيان الإرث.')],
      specs: [{ label: L('Client', 'العميل'), value: L('Diriyah Gate', 'بوابة الدرعية') }],
      services: [L('Architecture', 'العمارة'), L('Urban', 'العمران')],
      clientName: 'Diriyah Gate',
      status: ProjectStatus.Published,
      featured: false,
      sortOrder: 4,
    },
  ];
  for (const p of projects) await upsert(ds, Project, { slug: p.slug }, p);
  console.log(`  ✓ ${projects.length} projects`);

  // --- Services (disciplines) ---
  const services: Partial<Service>[] = [
    { slug: 'architecture', title: L('Architecture', 'العمارة'),
      shortDescription: L('Design from concept to delivery.', 'التصميم من الفكرة إلى التسليم.'),
      fullDescription: L('Full architectural design across all project phases.', 'تصميم معماري متكامل عبر كل مراحل المشروع.'),
      icon: 'compass', featured: true, sortOrder: 1 },
    { slug: 'structural', title: L('Structural Engineering', 'الهندسة الإنشائية'),
      shortDescription: L('Safe, efficient structures.', 'منشآت آمنة وفعّالة.'),
      fullDescription: L('Structural analysis and design for buildings and infrastructure.', 'تحليل وتصميم إنشائي للمباني والبنية التحتية.'),
      icon: 'frame', featured: true, sortOrder: 2 },
    { slug: 'mep', title: L('MEP Engineering', 'الهندسة الكهروميكانيكية'),
      shortDescription: L('Mechanical, electrical, plumbing.', 'الميكانيكا والكهرباء والسباكة.'),
      fullDescription: L('Integrated MEP systems engineered for performance.', 'أنظمة كهروميكانيكية متكاملة مصمّمة للأداء.'),
      icon: 'bolt', featured: true, sortOrder: 3 },
    { slug: 'urban-planning', title: L('Urban Planning', 'التخطيط العمراني'),
      shortDescription: L('Masterplans and districts.', 'المخططات الشاملة والأحياء.'),
      fullDescription: L('Masterplanning for sustainable, liveable districts.', 'تخطيط شامل لأحياء مستدامة وصالحة للعيش.'),
      icon: 'map', featured: true, sortOrder: 4 },
    { slug: 'project-management', title: L('Project Management', 'إدارة المشاريع'),
      shortDescription: L('Delivery, on time.', 'تسليم في الوقت المحدد.'),
      fullDescription: L('End-to-end project and construction management.', 'إدارة شاملة للمشاريع والإنشاء.'),
      icon: 'clipboard', featured: true, sortOrder: 5 },
  ];
  for (const s of services) await upsert(ds, Service, { slug: s.slug }, s);
  console.log(`  ✓ ${services.length} services`);

  // --- Team ---
  const team: Partial<TeamMember>[] = [
    { name: 'Mansour Al-Saleh', title: L('Founder & Principal', 'المؤسس والشريك الرئيسي'),
      bio: L('Leads design vision and practice strategy.', 'يقود الرؤية التصميمية واستراتيجية المكتب.'),
      photo: 'images/team-1.jpg', email: 'mansour@msp.sa', sortOrder: 1 },
    { name: 'Sara Al-Qahtani', title: L('Lead Architect', 'كبيرة المعماريين'),
      bio: L('Heads architectural delivery across studios.', 'تقود التسليم المعماري عبر الاستوديوهات.'),
      photo: 'images/team-2.jpg', sortOrder: 2 },
    { name: 'Omar Khan', title: L('Head of Structures', 'رئيس قسم الإنشاءات'),
      bio: L('Oversees structural engineering.', 'يشرف على الهندسة الإنشائية.'),
      photo: 'images/team-3.jpg', sortOrder: 3 },
    { name: 'Layla Hassan', title: L('MEP Director', 'مديرة الكهروميكانيكا'),
      bio: L('Directs building systems engineering.', 'تدير هندسة أنظمة المباني.'),
      photo: 'images/team-4.jpg', sortOrder: 4 },
  ];
  for (const t of team) await upsert(ds, TeamMember, { name: t.name }, t);
  console.log(`  ✓ ${team.length} team members`);

  // --- Testimonials ---
  const testimonials: Partial<Testimonial>[] = [
    { clientName: 'NEOM', role: L('Development Lead', 'قائد التطوير'),
      quote: L('MSP delivered with precision and care.', 'سلّم فريق MSP بدقّة واهتمام.'),
      rating: 5, sortOrder: 1 },
    { clientName: 'Qiddiya', role: L('Project Director', 'مدير المشروع'),
      quote: L('A trusted engineering partner.', 'شريك هندسي موثوق.'),
      rating: 5, sortOrder: 2 },
  ];
  for (const t of testimonials) await upsert(ds, Testimonial, { clientName: t.clientName }, t);
  console.log(`  ✓ ${testimonials.length} testimonials`);

  // --- Partners ---
  const partners: Partial<Partner>[] = [
    { name: 'NEOM', logo: 'images/partner-neom.png', sortOrder: 1 },
    { name: 'Qiddiya', logo: 'images/partner-qiddiya.png', sortOrder: 2 },
    { name: 'Diriyah Gate', logo: 'images/partner-diriyah.png', sortOrder: 3 },
    { name: 'Red Sea Global', logo: 'images/partner-redsea.png', sortOrder: 4 },
  ];
  for (const p of partners) await upsert(ds, Partner, { name: p.name }, p);
  console.log(`  ✓ ${partners.length} partners`);

  // --- Blog ---
  const posts: Partial<BlogPost>[] = [
    { slug: 'designing-for-the-desert', title: L('Designing for the Desert', 'التصميم للصحراء'),
      category: 'Insights',
      excerpt: L('How climate shapes our architecture.', 'كيف يشكّل المناخ عمارتنا.'),
      body: L('Long-form article body.', 'متن المقال المطوّل.'),
      cover: 'images/proj-1.jpg', author: 'MSP Studio',
      status: BlogStatus.Published, publishedAt: new Date('2026-01-15') as any, sortOrder: 1 },
  ];
  for (const post of posts) await upsert(ds, BlogPost, { slug: post.slug }, post);
  console.log(`  ✓ ${posts.length} blog posts`);

  // --- Settings (company & contact) ---
  const settings: Record<string, unknown> = {
    companyName: L('MSP — Architecture + Engineering', 'MSP — العمارة والهندسة'),
    tagline: L('A Saudi architecture & engineering consultancy.', 'مكتب استشارات معمارية وهندسية سعودي.'),
    phone: '+966 11 000 0000',
    whatsapp: '+966500000000',
    email: 'info@msp.sa',
    addressEn: 'Riyadh, Saudi Arabia',
    addressAr: 'الرياض، المملكة العربية السعودية',
    workingHours: L('Sun–Thu, 9:00–18:00', 'الأحد–الخميس، 9:00–18:00'),
    social: {
      linkedin: 'https://linkedin.com/company/msp',
      instagram: 'https://instagram.com/msp',
      x: 'https://x.com/msp',
    },
  };
  for (const [key, value] of Object.entries(settings)) {
    await upsert(ds, Setting, { key }, { key, value } as Partial<Setting>);
  }
  console.log(`  ✓ ${Object.keys(settings).length} settings`);

  // touch ContactMessage repo so the table is verified to exist
  await ds.getRepository(ContactMessage).count();

  await ds.destroy();
  console.log('Seed complete.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
