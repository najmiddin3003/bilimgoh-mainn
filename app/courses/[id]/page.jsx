"use client";

import { useParams } from "next/navigation";

import Image from "next/image";

export default function CourseDetail() {
  const params = useParams();

  const courses = [
    // TIL KURSLARI (4 ta)
    {
      id: 1,
      category: "Til kurslari",
      title: "Ingliz tili",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-1.jpg",
      duration: "6 oy",
      students: "2.4K",
      rating: "4.9",
      price: "200 000 so'm",
    },
    {
      id: 2,
      category: "Til kurslari",
      title: "Rus tili",
      instructor: "Ivan Petrov",
      image: "/assets/courses/course-img-2.jpg",
      duration: "5 oy",
      students: "1.8K",
      rating: "4.8",
      price: "180 000 so'm",
    },
    {
      id: 5,
      category: "Til kurslari",
      title: "IELTS Intensive",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-4.jpg",
      duration: "3 oy",
      students: "1.5K",
      rating: "5.0",
      price: "300 000 so'm",
    },
    {
      id: 6,
      category: "Til kurslari",
      title: "CEFR C1",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-3.jpg",
      duration: "4 oy",
      students: "900",
      rating: "4.9",
      price: "280 000 so'm",
    },

    // ANIQ FANLAR (3 ta)
    {
      id: 3,
      category: "Aniq fanlar",
      title: "Matematika",
      instructor: "Ali Karimov",
      image: "/assets/courses/course-img-1.jpg",
      duration: "4 oy",
      students: "3.2K",
      rating: "4.9",
      price: "220 000 so'm",
    },
    {
      id: 8,
      category: "Aniq fanlar",
      title: "Fizika",
      instructor: "Bekzod Rahimov",
      image: "/assets/courses/course-img-2.jpg",
      duration: "4 oy",
      students: "1.9K",
      rating: "4.8",
      price: "230 000 so'm",
    },
    {
      id: 9,
      category: "Aniq fanlar",
      title: "Kimyo",
      instructor: "Dilnoza Axmedova",
      image: "/assets/courses/course-img-4.jpg",
      duration: "4 oy",
      students: "1.4K",
      rating: "4.7",
      price: "220 000 so'm",
    },

    // IT KURSLAR (4 ta)
    {
      id: 4,
      category: "IT kurslar",
      title: "Frontend React",
      instructor: "Sarah Johnson",
      image: "/assets/courses/course-img-3.jpg",
      duration: "5 oy",
      students: "2.1K",
      rating: "4.8",
      price: "350 000 so'm",
    },
    {
      id: 10,
      category: "IT kurslar",
      title: "Backend Node.js",
      instructor: "John Smith",
      image: "/assets/courses/course-img-2.jpg",
      duration: "6 oy",
      students: "1.6K",
      rating: "4.8",
      price: "370 000 so'm",
    },
    {
      id: 11,
      category: "IT kurslar",
      title: "UI/UX Design",
      instructor: "Emily Clark",
      image: "/assets/courses/course-img-4.jpg",
      duration: "3 oy",
      students: "1.2K",
      rating: "4.9",
      price: "300 000 so'm",
    },
    {
      id: 12,
      category: "IT kurslar",
      title: "Python Programming",
      instructor: "Michael Brown",
      image: "/assets/courses/course-img-1.jpg",
      duration: "5 oy",
      students: "2.3K",
      rating: "4.9",
      price: "340 000 so'm",
    },

    // IJTIMOIY FANLAR (2 ta)
    {
      id: 13,
      category: "Ijtimoiy fanlar",
      title: "Tarix",
      instructor: "Sardor Islomov",
      image: "/assets/courses/course-img-4.jpg",
      duration: "4 oy",
      students: "1.3K",
      rating: "4.7",
      price: "200 000 so'm",
    },
    {
      id: 14,
      category: "Ijtimoiy fanlar",
      title: "Huquq",
      instructor: "Aziza Nurmatova",
      image: "/assets/courses/course-img-2.jpg",
      duration: "3 oy",
      students: "800",
      rating: "4.8",
      price: "210 000 so'm",
    },

    // IMTIHON TAYYORLOV (3 ta)
    {
      id: 15,
      category: "Imtihon tayyorlov",
      title: "IELTS Full Course",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-2.jpg",
      duration: "4 oy",
      students: "2K",
      rating: "5.0",
      price: "320 000 so'm",
    },
    {
      id: 16,
      category: "Imtihon tayyorlov",
      title: "CEFR B2",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-1.jpg",
      duration: "3 oy",
      students: "1.1K",
      rating: "4.9",
      price: "270 000 so'm",
    },
    {
      id: 17,
      category: "Imtihon tayyorlov",
      title: "DTM tayyorlov",
      instructor: "Ali Karimov",
      image: "/assets/courses/course-img-2.jpg",
      duration: "6 oy",
      students: "2.5K",
      rating: "4.8",
      price: "250 000 so'm",
    },

    // MAKTAB TAYYORLOV (2 ta)
    {
      id: 18,
      category: "Maktab tayyorlov",
      title: "1-4 sinf umumiy",
      instructor: "Dilafruz Xasanova",
      image: "/assets/courses/course-img-3.jpg",
      duration: "6 oy",
      students: "1.7K",
      rating: "4.8",
      price: "180 000 so'm",
    },
    {
      id: 19,
      category: "Maktab tayyorlov",
      title: "Prezident maktabi",
      instructor: "Ali Karimov",
      image: "/assets/courses/course-img-2.jpg",
      duration: "5 oy",
      students: "900",
      rating: "4.9",
      price: "300 000 so'm",
    },

    // KASBIY RIVOJLANISH (2 ta)
    {
      id: 20,
      category: "Kasbiy rivojlanish",
      title: "SMM Marketing",
      instructor: "Shohruh",
      image: "/assets/courses/course-img-1.jpg",
      duration: "2 oy",
      students: "1.2K",
      rating: "4.9",
      price: "350 000 so'm",
    },
    {
      id: 21,
      category: "Kasbiy rivojlanish",
      title: "Copywriting",
      instructor: "Azizbek",
      image: "/assets/courses/course-img-2.jpg",
      duration: "2 oy",
      students: "700",
      rating: "4.8",
      price: "300 000 so'm",
    },

    // BOLALAR KURSLARI (1 ta)
    {
      id: 22,
      category: "Bolalar kurslari",
      title: "Kids English",
      instructor: "Teacher Abdulloh",
      image: "/assets/courses/course-img-4.jpg",
      duration: "6 oy",
      students: "2K",
      rating: "4.9",
      price: "180 000 so'm",
    },
  ];

  const course = courses.find((c) => c.id === Number(params.id));

  if (!course) {
    return <div className="p-10">Kurs topilmadi ❌</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{course.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="md:col-span-2">
            <Image
              src={course.image}
              width={800}
              height={400}
              alt={course.title}
              className="rounded-2xl w-full h-[300px] object-cover"
            />

            <div className="bg-white p-6 rounded-2xl mt-6 shadow">
              <h2 className="text-xl font-semibold mb-3">Kurs haqida</h2>

              <p className="text-gray-600">
                {course.title} kursi orqali siz zamonaviy metodlar bilan bilim
                olasiz.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-2xl shadow h-fit">
            <h2 className="text-2xl font-bold mb-4">{course.price}</h2>

            <div className="space-y-3 text-sm mb-6">
              <p>⏱ {course.duration}</p>
              <p>👨‍🎓 {course.students}</p>
              <p>⭐ {course.rating}</p>
            </div>

            <button className="w-full bg-green-500 text-white py-3 rounded-full mb-3">
              Sotib olish
            </button>

            <button className="w-full border py-3 rounded-full">
              Savatga qo‘shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
