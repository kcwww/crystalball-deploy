'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { sessionUser } from '@/shared/types/user';
import { BACKEND_ROUTES, ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

const NicknameForm = ({ user }: { user: sessionUser }) => {
  const [check, setCheck] = useState(false);
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    return () => {
      setCheck(false);
      setSubmit(false);
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmit(true);
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
        router.refresh();
      }
    } catch (error) {
      toast.error('유저 이름을 저장하는데 실패했습니다.');
      setSubmit(false);
      console.error(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
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
                <Input
                  onFocus={(e) => {
                    // no zoom on mobile
                    e.target.style.fontSize = '16px';
                  }}
                  placeholder="Nickname"
                  {...field}
                />
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
        <div className="flex items-center gap-8">
          <Checkbox
            className={cn(
              'h-[1.8rem] w-[1.8rem] transform rounded-full text-white transition duration-200',
              !check && 'bg-white'
            )}
            checked={check}
            onCheckedChange={() => setCheck(!check)}
            id="terms&policy"
          />
          <Label className="text-white" htmlFor="terms&policy">
            <Link
              href="https://docs.myheratcrystal.com"
              target="_blank"
              className="hover:underline"
            >
              개인정보 처리방침 및 이용약관
            </Link>
            에 동의합니다.
          </Label>
        </div>

        <Button
          className="w-full"
          variant={'secondary'}
          type="submit"
          disabled={isLoading || !check || submit}
        >
          저장하기
        </Button>
      </form>
    </Form>
  );
};

export default NicknameForm;
