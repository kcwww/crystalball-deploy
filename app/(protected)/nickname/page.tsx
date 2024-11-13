'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sessionUser } from '@/shared/types/user';
import { BACKEND_ROUTES, ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: '유저 이름은 최소 1글자 이상이어야 합니다.',
    })
    .max(10, {
      message: '유저 이름은 최대 10글자 이하여야 합니다.',
    }),
});

const Nickname = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user = session?.user as sessionUser;
    const data = {
      username: values.username,
      email: user.email,
      provider: user.provider,
    };

    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.NICKNAME, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.replace(ROUTES.MAKE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <section className="flex h-dvh flex-col items-center justify-between py-28">
      <h1 className="text-3xl font-bold text-yellow-300">
        수정 구슬 속 내 마음
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-8">
                <FormLabel className="text-xl text-white">
                  사용하실 이름을 입력해주세요
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nickname" {...field} />
                </FormControl>
                <FormDescription>
                  이 이름은 다른 사용자들에게 보여지는 이름이 됩니다.
                  <br />
                  부적절한 닉네임은 서비스 이용에 제한이 있을 수 있습니다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            variant={'secondary'}
            type="submit"
            disabled={isLoading}
          >
            저장하기
          </Button>
        </form>
      </Form>
      <div />
    </section>
  );
};

export default Nickname;
