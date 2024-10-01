import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/shared/components/ui/button';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      {...(pending && { disabled: true })}
      className={`w-62 mt-10 h-10 rounded bg-blue-400 p-2 font-bold text-white`}
    >
      {pending ? 'Adding...' : 'Add Todo'}
    </Button>
  );
};

export default SubmitButton;
