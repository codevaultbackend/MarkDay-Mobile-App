{showSuccess && (

<Animated.View
entering={FadeInDown.duration(300)}
exiting={FadeOut.duration(200)}
layout={LinearTransition.duration(200)}
>

<LeaveSuccessCard
message={successMsg}
onClose={()=> setShowSuccess(false)}
/>

</Animated.View>