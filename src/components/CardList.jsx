import Card from './Card';

export default function CardList({ posts, filterPostsByTag }) {
  return (
    <div className="flex flex-wrap justify-center max-w-full">
      {posts.map((post) => <Card key={post.id} post={post} filterPostsByTag={filterPostsByTag} />)}
    </div>
  )
}