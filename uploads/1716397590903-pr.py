def threeSum(nums):
        triplets=[]
        group=[]
        for i in range(len(nums)):
            sum=nums[i]
            for j in range(i+1, len(nums)):
                sum+=nums[j]
                for k in range(j+1, len(nums)):
                    sum+=nums[k]
                    if sum==0:
                        group=[nums[i], nums[j], nums[k]]
                        print ("sum 0:")
                        print(group)
                        triplets.extend(group)
                    else:
                        group=[]
nums=[-1,0,1,2,-1,-4]
print(threeSum(nums))
