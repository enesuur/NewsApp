import React from 'react';
import { XStack, Button, Paragraph } from 'tamagui';
import { ArrowLeft,ArrowRight } from '@tamagui/lucide-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <XStack justifyContent="center" alignItems="center" paddingVertical="$2">
      <Button
        onPress={onPreviousPage}
        disabled={currentPage === 1}
        backgroundColor={currentPage === 1 ? '#A9A9A9' : 'red'}
        color="white"
        disabledStyle={{ opacity: 0.5 }}
        onPressIn={() => {
          if (currentPage > 1) {
            onPreviousPage();
          }
        }}
        size="$3"
        marginRight="$4"
        icon={<ArrowLeft/>}
      >
      </Button>

      <Paragraph fontWeight="bold">{`${currentPage}/${totalPages}`}</Paragraph>

      <Button
        onPress={onNextPage}
        disabled={currentPage === totalPages}
        backgroundColor={currentPage === totalPages ? '#A9A9A9' : 'red'}
        color="white"
        disabledStyle={{ opacity: 0.5 }}
        size="$3"
        marginLeft="$4"
        icon={<ArrowRight/>}
      >
      </Button>
    </XStack>
  );
};

export default Pagination;