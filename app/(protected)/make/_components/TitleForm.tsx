'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import { BOTTOM, MAIN_DECORATION } from '@/shared/constants/3dModel';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/types/user';

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: '수정구슬 이름을 입력해주세요.',
    })
    .max(10, {
      message: '수정구슬 이름은 10자 이하로 입력해주세요.',
    }),
});

const TitleForm = ({ userData }: { userData: User }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      setSubmitting(false);
    };
  }, []);

  const { setTitle, title, model, bottom, modelColor, bottomColor } =
    use3DModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    const modelArray = Object.values(MAIN_DECORATION);
    const modelId = modelArray.filter((item) => {
      return item.path === model;
    })[0].id;
    const bottomArray = Object.values(BOTTOM);
    const bottomId = bottomArray.filter((item) => {
      return item.path === bottom;
    })[0].id;

    const data = {
      user_id: userData._id,
      title: title,
      model: modelId,
      modelColor,
      bottom: bottomId,
      bottomColor,
      message_id: [],
    };

    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.CRYSTAL, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(ROUTES.MAIN);
        sessionStorage.setItem('isDecorated', 'true');
        router.refresh();
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <div />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pointer-events-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="수정구슬 이름을 입력해주세요."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) {
                      return;
                    }

                    setTitle({ title: value });
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          variant={'outline'}
          type="submit"
          disabled={isLoading || submitting}
        >
          수정구슬 만들기
        </Button>
      </form>
    </Form>
  );
};

export default TitleForm;
