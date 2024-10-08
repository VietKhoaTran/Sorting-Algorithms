def Selectionsort(arr):
    for i in range(len(arr)-1):
        x = i
        for j in range(i+1, len(arr)):
            if(arr[j] < arr[x]):
                x = j
        if(x!=i):
            arr[i], arr[x] = arr[x], arr[i]

arr = [1,4,6,1,9,10,4,5,1]
Selectionsort(arr)
print(arr)