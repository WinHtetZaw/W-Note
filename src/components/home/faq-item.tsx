type Props = { question: string; answer: string };

export default function FaqItem({ question, answer }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold">{question}</h3>

      <p className="mt-4 leading-7 text-zinc-400">{answer}</p>
    </div>
  );
}
