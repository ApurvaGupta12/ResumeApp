import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const reviews = [
  { id: 1, name: "Amit Sharma", text: "Great platform! Really helped me with my resume.", rating: 5 },
  { id: 2, name: "Priya Patel", text: "Easy to use and very intuitive.", rating: 4 },
  { id: 3, name: "Rahul Verma", text: "Good experience, but needs some improvements.", rating: 3 },
  { id: 4, name: "Sneha Kapoor", text: "Loved the AI recommendations!", rating: 5 },
  { id: 5, name: "Vikram Singh", text: "A must-use for job seekers.", rating: 4 },
  { id: 6, name: "Neha Joshi", text: "Nice interface and fast processing.", rating: 4 },
  { id: 7, name: "Arjun Mehta", text: "Helped me land my first job!", rating: 5 },
];

export function ReviewSection() {
  return (
    <motion.div
      className="flex flex-col items-center py-10 w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.3 }} // 👈 Triggers animation every time it comes into view
    >
      <motion.h1
        className="text-5xl font-bold text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ amount: 0.3 }}
      >
        Reviewed by the Community & Trusted by Professionals
      </motion.h1>

      <Carousel className="h-full max-w-2xl w-full">
        <CarouselContent className="-ml-1 flex">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }} // Starts smaller and faded
              whileInView={{ opacity: 1, scale: 1 }} // Expands into place
              transition={{ duration: 0.5, delay: index * 0.1 }} // Slight delay for each review
              viewport={{ amount: 0.2 }}
            >
              <CarouselItem className="basis-1/2 px-4">
                <Card className="border-none shadow-lg h-full">
                  <CardContent className="p-9 text-center flex flex-col justify-between h-full">
                    <h1 className="text-lg font-bold">{review.name}</h1>
                    <p className="text-sm text-gray-600 mt-2 flex-grow">{review.text}</p>
                    <div className="flex justify-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </motion.div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
}
