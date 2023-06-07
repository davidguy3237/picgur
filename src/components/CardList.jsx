import Card from './Card';

export default function CardList({ posts }) {
  return (
    <div className="flex flex-wrap justify-center max-w-full">
      {posts.map((post) => <Card key={post.id} post={post} />)}
    </div>
  )
}