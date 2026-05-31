import React, { useMemo, useState } from "react";
import { Search, MapPin, Clock, CalendarDays, Star, Utensils, Info, Music, Palette, Theater, Film, PenLine, Mic2, Dumbbell, Building2, Users } from "lucide-react";
function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant = "outline", children, ...props }) {
  const base = "px-4 py-2 text-sm font-semibold transition";
  const style =
    variant === "default"
      ? "bg-gradient-to-r from-sky-700 via-purple-700 to-orange-500 text-white border border-orange-300"
      : "border border-sky-200 bg-white text-slate-900";
  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
}

const DAYS = ["June 1", "June 2", "June 3"];

const buildings = {
  CB: { name: "Crabiel Hall", note: "School check-in; literary, film, vocal, theater adjudications; workshops" },
  CC: { name: "College Center", note: "Food, activities, workshops, instrumental and solo adjudications" },
  PE: { name: "Physical Education Center", note: "Dance adjudications and warmups" },
  ST: { name: "Studio Theatre", note: "Visual arts gallery and musical theater adjudications" },
  ED: { name: "Edison Hall", note: "Visual arts and activity workshops" },
};

const adjudications = [
  { artform: "Creative Writing", location: "Crabiel Hall", room: "#119", map: "CB", category: "Literary" },
  { artform: "Poetry", location: "Crabiel Hall", room: "#121", map: "CB", category: "Literary" },
  { artform: "Filmmaking", location: "Crabiel Hall", room: "#122", map: "CB", category: "Film" },
  { artform: "Small & Large Theater", location: "Crabiel Hall", room: "Amboy Room & #124 for Monologues", map: "CB", category: "Theater" },
  { artform: "Small & Large Vocal", location: "Crabiel Hall", room: "Brunswick Room", map: "CB", category: "Vocal" },
  { artform: "Dance", location: "Physical Education Building", room: "Gym/Dance Studio", map: "PE", category: "Dance" },
  { artform: "Piano/Guitar/Small Instrumental", location: "College Center", room: "Corral", map: "CC", category: "Instrumental" },
  { artform: "Small & Large Instrumental", location: "College Center", room: "Terrace", map: "CC", category: "Instrumental" },
  { artform: "Vocal/Musical Theater Solos", location: "College Center", room: "#319–321", map: "CC", category: "Vocal / Musical Theater" },
  { artform: "Small & Large Musical Theater", location: "Studio Theatre", room: "Black Box", map: "ST", category: "Musical Theater" },
  { artform: "Visual Arts 2D & 3D", location: "Studio Theatre", room: "Gallery", map: "ST", category: "Visual Arts" },
];

const warmups = [
  { artform: "Dance", location: "Physical Education Building", room: "Racquetball 1 & 2" },
  { artform: "Holding Room – Small/Large Instrumental", location: "College Center", room: "#174–175" },
  { artform: "Musical Theater", location: "College Center", room: "PAC Side Lobby" },
  { artform: "Theater", location: "Crabiel", room: "Side Lobby outside" },
  { artform: "Vocal Music", location: "Crabiel", room: "Side Lobby outside" },
];

const adjudicators = [
  { name: "Dr. Anthony Branker", discipline: "Instrumental Music", bio: "Adjunct professor in jazz studies at Rutgers University Mason Gross School of the Arts, where he has taught courses in Black music historiography, jazz historiography, composition and arranging, improvisation, theory, and has directed multiple jazz ensembles. He previously taught at Princeton University for 27 years, held an endowed chair in jazz studies, founded Princeton’s jazz studies program, served as a U.S. Fulbright Scholar at the Estonian Academy of Music & Theatre, and has also taught at Manhattan School of Music, Hunter College, and Ursinus College." },
  { name: "Sara Braslow", discipline: "Musical Theater", bio: "Professional performer for 30 years. She spent four and a half years as Dance Captain and Swing on the Broadway National Tour of Mamma Mia! Other credits include Me and My Girl at Goodspeed, Beauty and the Beast at North Carolina Theatre, Holland America Cruise Line, and Miss Shields in A Christmas Story at Surflight Theatre. She holds a BFA in Musical Theatre from the University of Arizona and teaches musical theater dance, audition technique, and college submissions." },
  { name: "Doug Clarke", discipline: "Instrumental Music", bio: "Guitarist with a BA from Berklee College of Music and MM in jazz performance from Rutgers University. He studied with Tal Farlow and has performed internationally and throughout the U.S. with artists including Joe Williams, Bruce Barth, Mark Egan, Wynton Marsalis, Jon Faddis, Terell Stafford, and Gabrielle Stravelli. He composed theme music for the PBS show Healthy Heritage Kitchen, appears on more than 25 CDs, and teaches at Monmouth University, Middlesex College, and Brookdale Community College." },
  { name: "Eileen Cooper Sedek", discipline: "Vocal Music", bio: "Soprano, operatic and concert soloist, and recitalist who has performed in the U.S., Europe, and Asia. She has maintained an active voice and piano studio since 2010, with students continuing into music education and performance careers. She has served on the Board of Directors of the New York Singing Teachers’ Association and regularly serves as an adjudicator and master class technician for arts festivals throughout New Jersey." },
  { name: "Michael Anthony Donato", discipline: "Visual Arts", bio: "Graduate of the School of Visual Arts in New York City and award-winning children’s book illustrator. His work for Squanto and the First Thanksgiving appeared on Showtime and received Notable Children’s Video recognition from the American Library Association. His projects have earned Parents’ Choice and Skipping Stones honors, and his Ancient Egyptian mythology paintings were developed for a DVD program with Simon & Schuster and MoMA collaboration. He taught drawing and painting at Monmouth University for 25 years and currently teaches painting at duCret Center of Art." },
  { name: "Dave Dziemian", discipline: "Visual Arts", bio: "Former Teen Arts participant, professional artist for more than 29 years, and art professor for 21 years. His award-winning work has appeared in many galleries and often explores representational, allegorical, comic, mundane, and bizarre subjects in media including oil paint, watercolor, and ink." },
  { name: "Andrea Kron", discipline: "Dance", bio: "Graduate of The Ailey School in New York City, dancer, choreographer, coach, and Associate Member of the Stage Directors and Choreographers Society. Her credits include Hercules on Broadway at the New Amsterdam Theatre, Radio City Music Hall, regional theater, Nutcrackers, movie, and print work. She teaches ballet, Horton, theatre dance, and anatomy/injury prevention, and has served as a Bergen County Teen Arts Festival dance adjudicator and workshop presenter since 2005." },
  { name: "Brooke Mailhiot", discipline: "Filmmaking", bio: "Higher education leader specializing in e-learning technologies with degrees in film and video production, creativity and innovation, and higher education leadership. She began as a cinematographer and video editor, worked as a SONY ICE Team member, and is a TEDx speaker. She chairs Entertainment Technologies and teaches at Rowan College at Burlington County, overseeing Video/Digital Media and Sound/Recording Engineering programs. She has adjudicated film festivals, served on arts education panels, and hosts The Baroness podcast." },
  { name: "Aimee Mitacchione", discipline: "Dance", bio: "Assistant Professor of Dance at Middlesex College since 2000 and intermittent adjunct professor at Rutgers and Kean. She has adjudicated for NJ Teen Arts, Middlesex County Teen Arts, Ocean County Performing Arts High School, NJ Governor’s Awards, and National Society of Arts & Letters Choreography Competition. She holds an MA in Dance in Higher Education from NYU and BFA in Dance from Barat College of DePaul University. Her work spans jazz, musical theater, choreography, and professional performance." },
  { name: "Rose Nagy", discipline: "Vocal Music", bio: "Executive Director and Co-founder of NJWOMENSONG, a nonprofit women’s choir based in Flemington. She had a celebrated 30-year teaching career at JP Case Middle School, where her ensembles earned top festival honors and The Tigerettes performed at Carnegie Hall and ACDA/NAfME conferences. She has conducted NJ Junior High All-State Choirs and CJMEA Region II Intermediate Chorus, received two NJ Governor’s Teacher Recognition Awards, participated in the Fulbright Teacher Exchange, and holds degrees from Westminster Choir College and Teachers College, Columbia University." },
  { name: "Mike Noordzy", discipline: "Instrumental Music", bio: "Upright and electric bassist with bachelor’s and master’s degrees in Jazz Performance from Rutgers University Mason Gross School of the Arts, where he is an adjunct professor. He also teaches music appreciation and guitar at Middlesex College and performs frequently throughout New Jersey and New York City." },
  { name: "Carlyle Owens", discipline: "Theater", bio: "Theatre educator who teaches public speaking and theatre courses at Middlesex College. He has taught in the Actors Studio Drama School MFA program and Pace University’s BA performing arts program. He has taught Acting for Arts High and appeared at McCarter Theatre Center, Shakespeare and Company, Great Lakes Theatre Festival, Cleveland Playhouse, Peculiar Works Project, The Otterbein Group, Monomoy Theater, and in Quinn Shephard’s film Blame." },
  { name: "Gerald Romano", discipline: "Instrumental Music", bio: "Band director at Monmouth Regional High School for 21 years and New Jersey public school educator for more than 30 years. A professional trumpet player, he has performed with Total Soul/Soul Machine, The Happenings, Martha Reeves and the Vandellas, Wynton Marsalis, Jon Faddis, and on Broadway in Starlight Express and Guys and Dolls. He holds degrees from Fairleigh Dickinson University and New Jersey City University, completed graduate studies at the University of Miami, and is a respected jazz educator and award-winning teacher." },
  { name: "Corinne Schaefer", discipline: "Musical Theater", bio: "Soprano with extensive professional performance experience. She starred as Carlotta in The Phantom of the Opera in Hamburg, Germany, performing the role more than 100 times. Opera roles include Queen of the Night, Beth in the European premiere of Little Women, Olympia, Gretel, and Musetta. She has appeared with orchestras including the New Jersey Symphony Orchestra, holds degrees and leadership training from Indiana University, Academy of Vocal Arts, and Eastman, and founded Creative OPERAtions to expand access to classical music." },
  { name: "Donna Sinisgalli", discipline: "Visual Arts", bio: "Art educator with more than 30 years of experience and a doctorate in Educational Leadership from Kean University. She supervised Visual and Performing Arts in Orange, managing 40 art educators across visual art, music, dance, and theater. She is also a professional artist specializing in paintings and murals, with work collected by corporations and exhibited in galleries and museums throughout New Jersey, New York, and Pennsylvania." },
  { name: "Kerrianne Spellman", discipline: "Musical Theater", bio: "Professional actress and singer for 35 years. She played Fantine in three companies of Les Misérables, including Broadway, and starred in The Cover of Life at The American Place Theatre. An AMDA graduate, she has appeared in Law and Order, Sex and the City, As the World Turns, and God Friended Me, continues to work in commercials and voiceovers, teaches voice and acting, and owns The Broadway Repertory Company at The First Avenue Playhouse in Atlantic Highlands." },
  { name: "Amy Suznovich", discipline: "Vocal Music", bio: "Voice teacher specializing in musical theater performers of all ages and certified in all levels of Andrew Byrne’s Singing Athlete. She presents singing workshops along the East Coast and maintains an online and in-person voice studio in Southeastern Pennsylvania. As a performer, she has sung national anthems and patriotic songs at more than 110 professional sports games for MLB, NBA, MLS, and WNBA teams and co-founded Sotto Voce Musical Improv in New York City." },
  { name: "Sarah Van Clef", discipline: "Creative Writing", bio: "Poet and memoirist from South Amboy, New Jersey. Her lyrical essays and poems have appeared in Local Gems NJ Bards Literary Anthology, SoupCan Magazine, Philadelphia Stories, The Monmouth Review, and other publications. She is an adjunct professor of English at Monmouth University, Middlesex College, and Brookdale Community College, holds an MFA/MA in Creative Writing with a creative nonfiction concentration from Monmouth University, serves as Reviews Editor for Philadelphia Stories, and founded The Social Writerly online creative community network." },
  { name: "Donald Zirilli", discipline: "Poetry", bio: "Poet with a BA in English Literature from Drew University. He edited Now Culture for 10 years, has edited several other publications, and has had poetry published in more than 40 periodicals and anthologies. His work has been nominated for a Pushcart, the Forward Prize, and Best of the Net, and he was a finalist for the James Tate Prize. He has workshopped and read poetry publicly for more than 30 years, and his chapbook Heaven’s Not for You was published by Kelsay Books." },
];

const events = [
  { days: DAYS, title: "Jazz Funk", type: "Workshop", discipline: "Dance", start: "09:30", end: "10:15", location: "College Center", room: "Café C", map: "CC", description: "High-energy street jazz choreography focused on musicality, confidence, style, and performance quality." },
  { days: DAYS, title: "Comedy for Social Media", type: "Workshop", discipline: "Theater & Vocal", start: "09:30", end: "10:15", location: "College Center", room: "#173", map: "CC", description: "Comedy and performance skills for short-form social media." },
  { days: DAYS, title: "Smartphone Storytellers: Unleash Your MOJO", type: "Workshop", discipline: "Film", start: "09:30", end: "10:15", location: "Crabiel Hall", room: "#122", map: "CB", description: "Mobile storytelling with framing, lighting, sound, Filmic Pro, and mobile-journalism gear." },
  { days: DAYS, title: "Empty Bowls: Every Bowl Feeds a Soul", type: "Workshop", discipline: "Visual Arts", start: "09:45", end: "10:30", location: "Edison Hall", room: "#168", map: "ED", description: "Hand-build pottery bowls for a social-awareness project supporting nonprofit fundraising for local families." },
  { days: DAYS, title: "Acting the Song: The Deconstruction", type: "Workshop", discipline: "Theater & Vocal", start: "10:00", end: "10:45", location: "Crabiel Hall", room: "Raritan Room", map: "CB", description: "Read lyrics as spoken monologue to find emotional triggers and story-first musical theater interpretation." },
  { days: DAYS, title: "Charcoal Figure Drawing", type: "Workshop", discipline: "Visual Arts", start: "10:00", end: "10:45", location: "Edison Hall", room: "#165", map: "ED", description: "Draw the human figure from a live model using charcoal and newsprint, exploring proportion, gesture, volume, and shading." },
  { days: DAYS, title: "Origami", type: "Workshop", discipline: "Visual Arts", start: "10:00", end: "10:45", location: "Edison Hall", room: "#114", map: "ED", description: "Paper-folding workshop developing sequencing, spatial perception, and fine-motor skills." },
  { days: DAYS, title: "Jam Session – Anyone Can Improvise", type: "Workshop", discipline: "Instrumental", start: "10:00", end: "10:45", location: "College Center", room: "Gallery upstairs", map: "CC", description: "Group improvisation through rhythm, melodic cells, chord progressions, extended techniques, and a jam session. Bring instruments and amps; piano and drums provided." },
  { days: DAYS, title: "Passionate Salsa & Lively Cha Cha", type: "Workshop", discipline: "Dance", start: "10:15", end: "11:00", location: "College Center", room: "Café B", map: "CC", description: "Ballroom dance fundamentals with Michael Salvador; no partner or prior experience required." },
  { days: DAYS, title: "Culinary Arts – Pizza Making", type: "Workshop", discipline: "Culinary", start: "10:15", end: "11:00", location: "College Center", room: "#109", map: "CC", description: "Hands-on teen pizza-making workshop." },
  { days: DAYS, title: "NFL Style Dance", type: "Workshop", discipline: "Dance", start: "10:30", end: "11:15", location: "College Center", room: "Café C", map: "CC", description: "Professional football dance-team style with sharp pom technique, jazz, hip-hop, and field-worthy energy." },
  { days: DAYS, title: "Comedy for Social Media", type: "Workshop", discipline: "Theater & Vocal", start: "10:45", end: "11:30", location: "College Center", room: "#173", map: "CC", description: "Comedy and performance skills for short-form social media." },
  { days: DAYS, title: "Poets Block", type: "Workshop", discipline: "Literary", start: "11:00", end: "11:45", location: "Crabiel Hall", room: "#121", map: "CB", description: "Use obstacles in a poem to create conflict, motion, and engagement. Bring writing materials." },
  { days: DAYS, title: "Acting the Song: The Integration", type: "Workshop", discipline: "Theater & Vocal", start: "11:00", end: "11:45", location: "Crabiel Hall", room: "Raritan Room", map: "CB", description: "Re-add music while maintaining speech-level urgency." },
  { days: DAYS, title: "Empty Bowls: Every Bowl Feeds a Soul", type: "Workshop", discipline: "Visual Arts", start: "11:00", end: "11:45", location: "Edison Hall", room: "#168", map: "ED", description: "Hand-build pottery bowls for a social-awareness project supporting nonprofit fundraising for local families." },
  { days: DAYS, title: "Charcoal Figure Drawing", type: "Workshop", discipline: "Visual Arts", start: "11:00", end: "11:45", location: "Edison Hall", room: "#165", map: "ED", description: "Draw the human figure from a live model using charcoal and newsprint." },
  { days: DAYS, title: "Origami", type: "Workshop", discipline: "Visual Arts", start: "11:00", end: "11:45", location: "Edison Hall", room: "#114", map: "ED", description: "Paper-folding workshop developing sequencing, spatial perception, and fine-motor skills." },
  { days: DAYS, title: "Jam Session – Anyone Can Improvise", type: "Workshop", discipline: "Instrumental", start: "11:00", end: "11:45", location: "College Center", room: "Gallery upstairs", map: "CC", description: "Group improvisation and jam session. Bring instruments and amps; piano and drums provided." },
  { days: DAYS, title: "Dramatic Tango & Smooth Bachata", type: "Workshop", discipline: "Dance", start: "11:15", end: "12:00", location: "College Center", room: "Café B", map: "CC", description: "Ballroom dance fundamentals with Michael Salvador; no partner or prior experience required." },
  { days: DAYS, title: "Culinary Arts – Pizza Making", type: "Workshop", discipline: "Culinary", start: "11:15", end: "12:00", location: "College Center", room: "#109", map: "CC", description: "Hands-on teen pizza-making workshop." },
  { days: DAYS, title: "Jazz Funk", type: "Workshop", discipline: "Dance", start: "12:00", end: "12:45", location: "College Center", room: "Café C", map: "CC", description: "High-energy street jazz choreography focused on confidence and performance quality." },
  { days: DAYS, title: "Creative Writing in the Age of AI", type: "Workshop", discipline: "Literary", start: "12:00", end: "12:45", location: "Crabiel Hall", room: "#119", map: "CB", description: "Use technology to expand genre, imagination, and creative writing practice." },
  { days: DAYS, title: "Film Screenings", type: "Workshop", discipline: "Film", start: "12:00", end: "13:00", location: "Crabiel Hall", room: "#122", map: "CB", description: "Festival-nominated film screenings with discussion after each production. Drop-in; no registration required." },
  { days: DAYS, title: "Graceful Waltz & High-Energy Swing", type: "Workshop", discipline: "Dance", start: "12:15", end: "13:00", location: "College Center", room: "Café B", map: "CC", description: "Ballroom dance fundamentals with Michael Salvador; no partner or prior experience required." },
  { days: DAYS, title: "Acting the Song: The Delivery", type: "Workshop", discipline: "Theater & Vocal", start: "12:15", end: "13:00", location: "Crabiel Hall", room: "Raritan Room", map: "CB", description: "Final performance focused on eye contact, the moment before, and transition into song." },
  { days: DAYS, title: "Empty Bowls: Every Bowl Feeds a Soul", type: "Workshop", discipline: "Visual Arts", start: "12:15", end: "13:00", location: "Edison Hall", room: "#168", map: "ED", description: "Hand-build pottery bowls for a social-awareness project supporting nonprofit fundraising for local families." },
  { days: DAYS, title: "Charcoal Figure Drawing", type: "Workshop", discipline: "Visual Arts", start: "12:15", end: "13:00", location: "Edison Hall", room: "#165", map: "ED", description: "Draw the human figure from a live model using charcoal and newsprint." },
  { days: DAYS, title: "Origami", type: "Workshop", discipline: "Visual Arts", start: "12:15", end: "13:00", location: "Edison Hall", room: "#114", map: "ED", description: "Paper-folding workshop developing sequencing, spatial perception, and fine-motor skills." },
  { days: DAYS, title: "Jam Session – Anyone Can Improvise", type: "Workshop", discipline: "Instrumental", start: "12:15", end: "13:00", location: "College Center", room: "Gallery upstairs", map: "CC", description: "Group improvisation and jam session. Bring instruments and amps; piano and drums provided." },
  { days: DAYS, title: "Comedy for Social Media", type: "Workshop", discipline: "Theater & Vocal", start: "12:15", end: "13:00", location: "College Center", room: "#173", map: "CC", description: "Comedy and performance skills for short-form social media." },
  { days: DAYS, title: "How to Improve Your Singing Faster", type: "Workshop", discipline: "Theater & Vocal", start: "12:30", end: "13:15", location: "College Center", room: "#319–321", map: "CC", description: "Practice techniques and strategies to improve singing faster." },
  { days: ["June 3"], title: "Creative Changemakers Award", type: "Award", discipline: "Awards", start: "12:00", end: "12:30", location: "College Center", room: "Café A", map: "CC", description: "Awards begin at noon." },
  { days: ["June 3"], title: "Art Educator of the Year Award", type: "Award", discipline: "Awards", start: "12:15", end: "12:45", location: "College Center", room: "Café A", map: "CC", description: "Recognition for the 2026 Arts Educator of the Year." },
  { days: DAYS, title: "African Drum Circle", type: "Activity", discipline: "Music", start: "All day", end: "", location: "College Center", room: "Lawn", map: "CC", description: "Hands-on drum circle inspired by rhythms of Ghana using traditional instruments." },
  { days: DAYS, title: "ArtStop Coloring Station", type: "Activity", discipline: "Visual Arts", start: "All day", end: "", location: "College Center", room: "Lobby", map: "CC", description: "Relax, recharge, and create at the coloring station." },
  { days: DAYS, title: "Backpack Charms", type: "Activity", discipline: "Visual Arts", start: "All day", end: "", location: "Physical Education Building", room: "Lobby", map: "PE", description: "Make a unique backpack charm." },
  { days: DAYS, title: "Chalk Art", type: "Activity", discipline: "Visual Arts", start: "All day", end: "", location: "Outside Edison Hall", room: "", map: "ED", description: "Outdoor chalk art activity." },
  { days: DAYS, title: "Craft & Convos – Box Truck", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Parking Lot #3", room: "", map: "Lot 3", description: "Symbols of Us: create visual tiles representing identity, dreams, cultures, and values for a collaborative tapestry." },
  { days: DAYS, title: "DJ Gabagool’s Karaoke & Open Mic Extravaganza", type: "Activity", discipline: "Performance", start: "Drop-in", end: "", location: "College Center", room: "Café A", map: "CC", description: "Karaoke, open mic, poetry, live DJing, instruments, and collaborative performance." },
  { days: DAYS, title: "Henna Designs", type: "Activity", discipline: "Visual Arts", start: "All day", end: "", location: "College Center", room: "Side Lobby", map: "CC", description: "Natural henna designs, symbolic and ornamental." },
  { days: DAYS, title: "Instax Wide Photography", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Edison Hall", room: "#112", map: "ED", description: "Create bespoke Instax/Polaroid portraits with custom backgrounds and lighting techniques." },
  { days: DAYS, title: "Jewelers: The Ultimate Recyclers", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Edison Hall", room: "#167", map: "ED", description: "Create jewelry using surprising materials." },
  { days: DAYS, title: "Juggling for Everyone", type: "Activity", discipline: "Performance", start: "All day", end: "", location: "College Center", room: "Lobby", map: "CC", description: "Learn to juggle for the first time or add new tricks." },
  { days: DAYS, title: "Patterns, Mosaics & Tessellations: Group Mural", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Edison Hall", room: "Lobby", map: "ED", description: "Create repeating-pattern tiles, learn symmetry and tessellation, and contribute to a collaborative mural." },
  { days: DAYS, title: "Photobooth", type: "Activity", discipline: "Activities", start: "All day", end: "", location: "College Center", room: "Lobby", map: "CC", description: "Festival photobooth." },
  { days: DAYS, title: "Surreal Collage Mashup", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Edison Hall", room: "#113", map: "ED", description: "Magazine-image surreal portrait collage exploring identity and imagination." },
  { days: DAYS, title: "T-Shirt Upcycling", type: "Activity", discipline: "Visual Arts", start: "Drop-in", end: "", location: "Edison Hall", room: "#162", map: "ED", description: "No-sew upcycling using cutting and knot-tying to transform old T-shirts into new items." },
];

const reminders = [
  "Check in inside Crabiel Hall on arrival. Teachers, individually registered students, artists, volunteers, and guests must check in.",
  "Buses park in Lot #2. Food trucks are in Lot #3.",
  "Performing students should arrive at the performance venue 10 minutes before the scheduled time.",
  "Food and beverages are not permitted in workshop or performance venues.",
  "For serious illness or injury, call 911. Middlesex College Police: 732-906-2500.",
];

const disciplineIcons = {
  Dance: Dumbbell,
  "Visual Arts": Palette,
  "Theater & Vocal": Theater,
  Film: Film,
  Literary: PenLine,
  Instrumental: Music,
  Music: Music,
  Performance: Mic2,
  Awards: Star,
  Culinary: Utensils,
  Activities: Users,
};

function timeValue(t) {
  if (!t || t === "All day") return 0;
  if (t === "Drop-in") return 9999;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function prettyTime(e) {
  if (e.start === "All day" || e.start === "Drop-in") return e.start;
  const fmt = (t) => {
    const [hh, mm] = t.split(":").map(Number);
    const h12 = hh > 12 ? hh - 12 : hh;
    const suffix = hh >= 12 ? "PM" : "AM";
    return `${h12}:${String(mm).padStart(2, "0")} ${suffix}`;
  };
  return `${fmt(e.start)}${e.end ? `–${fmt(e.end)}` : ""}`;
}

function Badge({ children }) {
  return <span className="rounded-full bg-gradient-to-r from-orange-100 via-sky-100 to-purple-100 px-3 py-1 text-xs font-black text-slate-800 shadow-sm ring-1 ring-sky-200">{children}</span>;
}

function EventCard({ event }) {
  const Icon = disciplineIcons[event.discipline] || CalendarDays;
  return (
    <Card className="overflow-hidden rounded-2xl border-2 border-sky-100 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-sky-500 p-2 text-white shadow-md"><Icon className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              <Badge>{event.type}</Badge><Badge>{event.discipline}</Badge>{event.map && <Badge>{event.map}</Badge>}
            </div>
            <h3 className="mt-3 text-lg font-black leading-tight text-slate-950">{event.title}</h3>
            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-700 sm:flex-row sm:flex-wrap sm:gap-4">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{prettyTime(event)}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{event.location}{event.room ? `, ${event.room}` : ""}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TeenArtsFestivalApp() {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("All");
  const [type, setType] = useState("All");
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [tab, setTab] = useState("schedule");
  const [selectedDay, setSelectedDay] = useState("June 1");

  const disciplines = ["All", ...Array.from(new Set(events.map(e => e.discipline))).sort()];
  const types = ["All", ...Array.from(new Set(events.map(e => e.type))).sort()];
  const buildingKeys = ["All", ...Array.from(new Set([...events.map(e => e.map), ...adjudications.map(a => a.map)]))].filter(Boolean);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter(e => e.days?.includes(selectedDay))
      .filter(e => discipline === "All" || e.discipline === discipline)
      .filter(e => type === "All" || e.type === type)
      .filter(e => selectedBuilding === "All" || e.map === selectedBuilding)
      .filter(e => !q || [e.title, e.type, e.discipline, e.location, e.room, e.description, e.map].join(" ").toLowerCase().includes(q))
      .sort((a, b) => timeValue(a.start) - timeValue(b.start) || a.title.localeCompare(b.title));
  }, [query, discipline, type, selectedBuilding, selectedDay]);

  const nowNext = filteredEvents.filter(e => e.start !== "All day" && e.start !== "Drop-in").slice(0, 6);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_32%),radial-gradient(circle_at_top_right,#bae6fd,transparent_30%),radial-gradient(circle_at_bottom_left,#ddd6fe,transparent_35%),linear-gradient(135deg,#fff7ed,#f0f9ff,#faf5ff)] text-slate-900">
      <header className="relative overflow-hidden border-b bg-gradient-to-br from-sky-700 via-purple-700 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #facc15 0 8%, transparent 9%), radial-gradient(circle at 70% 0%, #22c55e 0 10%, transparent 11%), radial-gradient(circle at 90% 60%, #38bdf8 0 12%, transparent 13%), radial-gradient(circle at 45% 80%, #ec4899 0 9%, transparent 10%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-200 drop-shadow">New Jersey State Teen Arts Festival 2026</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl"><span className="bg-gradient-to-r from-white via-yellow-100 to-sky-100 bg-clip-text text-transparent">Art Unites Us All</span></h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-200">June 1, 2 & 3 at Middlesex College, 2600 Woodbridge Ave, Edison, NJ. A searchable event app for sessions, workshops, adjudications, warmups, activities, awards, food, and campus navigation.</p>
            </div>
            <div className="grid gap-2 rounded-2xl border border-white/30 bg-white/15 p-4 text-sm shadow-xl backdrop-blur">
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4" />Check-in: Crabiel Hall</div>
              <div className="flex items-center gap-2"><Utensils className="h-4 w-4" />Food trucks: Lot #3</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />Bus parking: Lot #2</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {DAYS.map(day => {
            const dayCount = events.filter(e => e.days?.includes(day)).length;
            return (
              <button key={day} onClick={() => setSelectedDay(day)} className="text-left">
                <Card className={`rounded-2xl border-2 transition ${selectedDay === day ? "border-orange-400 bg-gradient-to-br from-sky-700 via-purple-700 to-orange-500 text-white shadow-xl" : "border-sky-100 bg-white/90 hover:border-pink-300 hover:shadow-lg"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 font-bold"><CalendarDays className="h-5 w-5" />{day}</div>
                    <p className={`mt-1 text-sm ${selectedDay === day ? "text-slate-200" : "text-slate-600"}`}>{day === "June 3" ? "Festival programming plus awards" : "Festival programming on campus"}</p>
                    <p className={`mt-2 text-xs font-semibold ${selectedDay === day ? "text-sky-200" : "text-slate-500"}`}>{dayCount} schedule items</p>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        <div className="sticky top-0 z-10 -mx-4 border-y bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[['schedule','Schedule'], ['adjudications','Adjudications'], ['adjudicators','Adjudicators'], ['map','Map & Logistics']].map(([id,label]) => (
                <Button key={id} onClick={() => setTab(id)} variant={tab === id ? "default" : "outline"} className="rounded-full">{label}</Button>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2 lg:max-w-3xl lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="h-10 w-full rounded-full border bg-white pl-9 pr-4 text-sm outline-none ring-slate-300 focus:ring-2" placeholder="Search by workshop, room, discipline, or keyword" value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              <select className="h-10 rounded-full border bg-white px-3 text-sm" value={discipline} onChange={e => setDiscipline(e.target.value)}>{disciplines.map(d => <option key={d}>{d}</option>)}</select>
              <select className="h-10 rounded-full border bg-white px-3 text-sm" value={type} onChange={e => setType(e.target.value)}>{types.map(t => <option key={t}>{t}</option>)}</select>
              <select className="h-10 rounded-full border bg-white px-3 text-sm" value={selectedBuilding} onChange={e => setSelectedBuilding(e.target.value)}>{buildingKeys.map(b => <option key={b}>{b}</option>)}</select>
            </div>
          </div>
        </div>

        {tab === "schedule" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">{selectedDay} Schedule</h2>
                <p className="text-sm text-slate-600">{filteredEvents.length} items</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {filteredEvents.map((event, index) => <EventCard key={`${event.title}-${event.start}-${index}`} event={event} />)}
              </div>
            </div>
            <aside className="space-y-4">
              <Card className="rounded-2xl bg-slate-950 text-white"><CardContent className="p-5"><h3 className="text-lg font-bold">{selectedDay} timed sessions</h3><div className="mt-4 space-y-3">{nowNext.map((e,i)=><div key={i} className="rounded-xl bg-white/10 p-3"><div className="text-sm font-semibold text-sky-200">{prettyTime(e)}</div><div className="font-bold">{e.title}</div><div className="text-sm text-slate-300">{e.location} {e.room}</div></div>)}</div></CardContent></Card>
              <Card className="rounded-2xl"><CardContent className="p-5"><h3 className="flex items-center gap-2 text-lg font-bold"><Info className="h-5 w-5" />Festival Reminders</h3><ul className="mt-3 space-y-2 text-sm text-slate-700">{reminders.map((r,i)=><li key={i} className="rounded-xl bg-slate-50 p-3">{r}</li>)}</ul></CardContent></Card>
            </aside>
          </section>
        )}

        {tab === "adjudications" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="mb-4 text-2xl font-black">Adjudications Directory</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {adjudications
                  .filter(a => selectedBuilding === "All" || a.map === selectedBuilding)
                  .filter(a => !query.trim() || Object.values(a).join(" ").toLowerCase().includes(query.toLowerCase()))
                  .map((a) => (
                  <Card key={a.artform} className="rounded-2xl"><CardContent className="p-4"><div className="flex flex-wrap gap-2"><Badge>{a.category}</Badge><Badge>{a.map}</Badge></div><h3 className="mt-3 text-lg font-bold">{a.artform}</h3><p className="mt-2 flex items-center gap-2 text-sm text-slate-700"><MapPin className="h-4 w-4" />{a.location}, {a.room}</p></CardContent></Card>
                ))}
              </div>
            </div>
            <aside>
              <Card className="rounded-2xl"><CardContent className="p-5"><h3 className="text-lg font-bold">Warmups & Holding Rooms</h3><div className="mt-3 space-y-3">{warmups.map(w => <div key={w.artform} className="rounded-xl bg-slate-50 p-3"><div className="font-semibold">{w.artform}</div><div className="text-sm text-slate-600">{w.location}, {w.room}</div></div>)}</div></CardContent></Card>
            </aside>
          </section>
        )}

        {tab === "adjudicators" && (
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-black">Meet the Adjudicators</h2>
              <p className="text-sm text-slate-600">{adjudicators.filter(a => !query.trim() || [a.name, a.discipline, a.bio].join(" ").toLowerCase().includes(query.toLowerCase())).length} adjudicators</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {adjudicators
                .filter(a => !query.trim() || [a.name, a.discipline, a.bio].join(" ").toLowerCase().includes(query.toLowerCase()))
                .map((a) => (
                  <Card key={a.name} className="rounded-2xl bg-white/90 shadow-sm transition hover:shadow-md">
                    <CardContent className="p-5">
                      <Badge>{a.discipline}</Badge>
                      <h3 className="mt-3 text-xl font-black text-slate-950">{a.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{a.bio}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {tab === "map" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card className="rounded-2xl"><CardContent className="p-5"><h2 className="text-2xl font-black">Campus Map Key</h2><div className="mt-4 grid gap-3">{Object.entries(buildings).map(([key,b]) => <div key={key} className="rounded-xl border bg-white p-4"><div className="flex items-center gap-2 text-lg font-bold"><Badge>{key}</Badge>{b.name}</div><p className="mt-2 text-sm text-slate-600">{b.note}</p></div>)}</div></CardContent></Card>
            <Card className="rounded-2xl"><CardContent className="p-5"><h2 className="text-2xl font-black">Logistics</h2><div className="mt-4 space-y-3 text-sm text-slate-700"><p className="rounded-xl bg-slate-50 p-3"><b>Parking:</b> Guests check in near Lot #1 at Crabiel Hall. Buses use Lot #2. Food trucks are in Lot #3.</p><p className="rounded-xl bg-slate-50 p-3"><b>Lunch:</b> Food trucks are in Lot #3. Seating is outside College Center and inside Café A. College Center cafeteria is open.</p><p className="rounded-xl bg-slate-50 p-3"><b>Accessibility:</b> Middlesex College is ADA compliant. The program asks visitors to contact Teen Arts NJ two weeks prior for assistive services.</p><p className="rounded-xl bg-slate-50 p-3"><b>Emergency:</b> Call 911 for serious illness or injury. Middlesex College Police: 732-906-2500.</p></div></CardContent></Card>
          </section>
        )}
      </main>
    </div>
  );
}
