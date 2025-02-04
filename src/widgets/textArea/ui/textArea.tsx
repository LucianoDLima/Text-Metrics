import './textArea.scss';

export function TextArea() {
  return (
    <div>
      <textarea
        data-testid='text-area'
        className='text-area fs-body--md text-clr--secondary bg-clr--primary border-clr--primary'
      >
        {/* test text to compare to figma's style. Remove before prod */}
        Design is the silent ambassador of your brand. Simplicity is key to
        effective communication, creating clarity in every interaction. A great
        design transforms complex ideas into elegant solutions, making them easy
        to understand. It blends aesthetics and functionality seamlessly.
      </textarea>
    </div>
  );
}
