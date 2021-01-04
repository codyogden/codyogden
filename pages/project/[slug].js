import { useRouter } from 'next/router';

export default function ProjectPage() {
  const router = useRouter()
  const { slug } = router.query
  return(
    <>
      Project page for {slug}.
    </>
  );
}
