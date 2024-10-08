def Quicksort(arr, low, high):
    i = low
    j = high
    mid = arr[(high+low)//2]
    while(i<=j):
        while(arr[i]<mid): i+=1
        while(arr[j]>mid): j-=1
        if(i<=j):
            arr[i], arr[j] = arr[j], arr[i]
            i+=1
            j-=1
    if(i<high): Quicksort(arr, i, high)
    if(j>low): Quicksort(arr, low, j)

arr = [5,9,1,8,6,4,3,2,10,7]
Quicksort(arr, 0, len(arr)-1)
print(arr)
