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
import { Textarea } from '@/components/ui/textarea';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

const formSchema = z.object({
  message: z
    .string()
    .min(1, '메세지를 입력해 주세요.')
    .max(500, '500자 이내로 입력해 주세요.'),
  author: z
    .string()
    .min(1, '보내는 이를 입력해 주세요.')
    .max(10, '10자 이내로 입력해 주세요.'),
});

const MessageForm = ({ userId, step }: { userId: string; step: number }) => {
  const router = useRouter();
  const { setMessage, setAuthor } = use3DModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      author: '',
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    router.replace(`/visit/${userId}`);
    sessionStorage.setItem('messageIsDecorated', 'true');
    sessionStorage.setItem('visitToast', 'true');
  };

  return (
    <Form {...form}>
      <div />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pointer-events-auto w-full space-y-8"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormControl>
                <Textarea
                  disabled={step === STEP.MESSAGE_NOTE_COLOR}
                  className="w-4/5 p-4 md:w-1/3"
                  placeholder="따뜻한 마음을 담아 메세지를 작성해 주세요."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 500) {
                      return;
                    }

                    setMessage({ message: value });
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormControl>
                <Input
                  className=" w-4/5 md:w-1/3"
                  placeholder="보내는 이"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) {
                      return;
                    }

                    setAuthor({ author: value });
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button className="w-4/5 md:w-1/3" variant={'outline'} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageForm;
