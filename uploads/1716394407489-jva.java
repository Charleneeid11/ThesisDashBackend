public static void bubbleSort(int[] arr)
{
    boolean swapped=true;
    while(swapped)
    {
        swapped=false;
        for (int i=0; i<arr.length-1; i++)
        {
            if (arr[i]>arr[i+1])
            {
                swapped=true;
                int temp=arr[i+1];
                arr[i+1]=arr[i];
                arr[i]=temp;
            }
        }
    }   
}

public static void bubbleSortOptimized(int[] arr) 
{
    int n = arr.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) 
    {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) 
        {
            if (arr[j] > arr[j + 1]) 
            {
                // swap temp and arr[i]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
}

public static void selectionSort(int[] arr)
{
    if (arr.length<=1)
        return;
    int min_index;
    int temp;
    for (int i=0; i<arr.length-1; i++)
    {
        min_index=i;
        for (int j=i+1; j<arr.length; j++)
        {
            if (arr[min_index]>arr[j])
            {
                min_index=j;
            }
        }
        temp=arr[min_index];
        arr[min_index]=arr[i];
        arr[i]=temp;
    }
}

public static int binarySearch(int[] arr, int target) 
{
    int left = 0;
    int right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; 
        if (arr[mid] == target) 
        {
            return mid; 
        }

        // If target greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }

    // If we reach here, then the element was not present
    return -1;
}

public static void insertionSort(int arr[]) 
{
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;

        /* Move elements of arr[0..i-1], that are
           greater than key, to one position ahead
           of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

