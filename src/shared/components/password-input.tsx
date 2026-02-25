import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isDisabled?: boolean;
}

/**
 * Password input with show/hide toggle button
 * Use this for password fields where you want to give the user the option to see what they typed
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, isDisabled, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Use either isDisabled or disabled prop for consistency with other components
    const isInputDisabled = isDisabled || disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)} // Ensure enough padding for the toggle button
          ref={ref}
          disabled={isInputDisabled}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isInputDisabled}
          tabIndex={-1} // Remove from tab sequence since it's auxiliary to the input
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
