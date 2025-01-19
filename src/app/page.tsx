import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            树洞留言板
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            在这里，你可以匿名给任何人留言，或者查看别人给你的留言。
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/write">
            <Button size="lg" className="w-full sm:w-auto">
              写留言
            </Button>
          </Link>
          <Link href="/search">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              查看留言
            </Button>
          </Link>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">使用说明</h2>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 text-left">
            <li>• 无需注册，直接写下你想说的话</li>
            <li>• 输入收信人姓名，对方可以通过姓名查看留言</li>
            <li>• 所有留言都是匿名的</li>
            <li>• 提交后会生成唯一的留言ID</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
