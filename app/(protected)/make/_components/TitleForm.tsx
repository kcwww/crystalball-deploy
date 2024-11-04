'use client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1).max(10),
});

const TitleForm = () => {
  const router = useRouter();
  const { setTitle } = use3DModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    router.replace('/main');
    sessionStorage.setItem('isDecorated', 'true');
    toast.success('새로운 수정 구슬이 만들어졌습니다.');
  };

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
        <Button className="w-full" variant={'outline'} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TitleForm;
