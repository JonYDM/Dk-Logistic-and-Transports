import { useEffect, useState } from 'react';
import Modal from './Modal';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { X } from 'lucide-react';

/**
 * ResponsiveDialog component
 * Renders a Modal on desktop and a Drawer on mobile
 */
const ResponsiveDialog = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  footer,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="px-6 overflow-y-auto max-h-[60vh]">
            {children}
          </div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose} size={size} title={title}>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      {children}
      {footer && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {footer}
        </div>
      )}
    </Modal>
  );
};

export default ResponsiveDialog;
