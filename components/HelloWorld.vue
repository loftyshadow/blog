<script setup>
defineOptions({
  name: "HelloWorld",
})

const x = 1;        // Declare x as a global constant
if (x === 1) {
  debugger
  const x = 2;      // Inside a block x can refer to a different value
  console.log(x); // Prints 2
}
console.log(x);     // Prints 1: we're back in the global scope now
</script>

<template>
  <div>
    <h1>Hello from Vue!</h1>
  </div>
</template>

