import { Button } from '@/shared/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function MeFormSubmitButton({
  isEdit,
  isDirty,
  setIsEdit,
  handleCancel,
}: {
  isEdit: boolean;
  isDirty: boolean;
  setIsEdit: (value: boolean) => void;
  handleCancel: () => void;
}) {
  return isEdit ? (
    <div className='absolute top-2 right-2 flex gap-2'>
      <Button type='submit' variant='outline' size='icon' disabled={!isDirty}>
        저장
      </Button>
      <Button type='button' variant='ghost' size='icon' onClick={handleCancel}>
        취소
      </Button>
    </div>
  ) : (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className='absolute top-2 right-2'
      onClick={() => setIsEdit(true)}
    >
      <Pencil2Icon />
    </Button>
  );
}
